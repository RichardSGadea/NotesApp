import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/notes/${id}`)
      .then((res) => setNote(res.data.data))
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Cargando nota...</p>;
  if (!note) return <p className="text-center text-gray-500">Nota no encontrada</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">{note.title}</h2>
      {note.content && <p className="text-gray-700 mb-4">{note.content}</p>}
      <small className="text-gray-400 block mb-4">
        Creada: {new Date(note.created_at).toLocaleString()} <br />
        Actualizada: {new Date(note.updated_at).toLocaleString()}
      </small>
      <div className="flex gap-2">
        <Link
          to={`/edit/${note.id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
        >
          Editar
        </Link>
        <Link
          to="/"
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-400 transition"
        >
          Volver
        </Link>
      </div>
    </div>
  );
}
