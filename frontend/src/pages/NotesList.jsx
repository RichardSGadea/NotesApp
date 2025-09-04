import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [error, setError] = useState(false);

  const fetchNotes = async () => {
    try {
      setError(false);
      const res = await axios.get(`/api/notes?q=${search}&page=${page}`);
      setNotes(Array.isArray(res.data.data) ? res.data.data : []);
      setLastPage(res.data.meta?.last_page || 1);
      setLoading(false);
    } catch (err) {
      console.error("Error al cargar notas:", err);
      setError(true);
      setLoading(true);
      setTimeout(fetchNotes, 3000); // reintento automático cada 3s
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchNotes();
  }, [search, page]);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres borrar esta nota?")) return;
    try {
      await axios.delete(`/api/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error(err);
      alert("Error al borrar la nota");
    }
  };

  const renderPagination = () => {
    if (lastPage <= 1) return null;
    return (
      <div className="flex gap-2 justify-center mt-4">
        {Array.from({ length: lastPage }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-3 py-1 rounded ${
              num === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Link
          to="/new"
          className="ml-4 bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
        >
          Nueva Nota
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col items-center h-40 justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-2"></div>
          {error && (
            <p className="text-sm text-red-500">
              Error al cargar notas. Reintentando...
            </p>
          )}
        </div>
      ) : !notes || notes.length === 0 ? (
        <p className="text-center text-gray-500">No hay notas disponibles</p>
      ) : (
        <>
          <ul className="space-y-4">
            {notes.map((note) => (
              <li
                key={note.id}
                className="bg-white p-4 rounded shadow flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{note.title}</h3>
                  {note.content && (
                    <p className="text-gray-600 text-sm truncate">
                      {note.content}
                    </p>
                  )}
                  <small className="text-gray-400 text-xs block mt-1">
                    {new Date(note.created_at).toLocaleString()}
                  </small>
                </div>
                <div className="mt-3 sm:mt-0 flex gap-2">
                  <Link
                    to={`/note/${note.id}`}
                    className="text-purple-500 hover:text-purple-700 font-semibold"
                  >
                    Ver
                  </Link>
                  <Link
                    to={`/edit/${note.id}`}
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Borrar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {renderPagination()}
        </>
      )}
    </div>
  );
}
