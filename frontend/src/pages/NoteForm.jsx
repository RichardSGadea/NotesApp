import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function NoteForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`/api/notes/${id}`)
        .then((res) => {
          setTitle(res.data.data.title);
          setContent(res.data.data.content || "");
        })
        .catch((err) => {
          setError(true);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const payload = { title, content };

    const request = id
      ? axios.put(`/api/notes/${id}`, payload)
      : axios.post("/api/notes", payload);

    request
      .then(() => navigate("/"))
      .catch((err) => {
        alert(
          err.response?.data?.errors
            ? JSON.stringify(err.response.data.errors)
            : "Error al guardar la nota"
        );
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        No se pudo cargar la nota. Backend caído o ID inválido.
      </p>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">{id ? "Editar" : "Nueva"} Nota</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Título *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Contenido</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
        >
          {id ? "Actualizar" : "Crear"} Nota
        </button>
      </form>
    </div>
  );
}
