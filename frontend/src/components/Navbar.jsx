import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="font-bold text-lg">NotesApp</Link>
        <Link to="/new" className="bg-white text-blue-600 px-3 py-1 rounded shadow">
          Nueva Nota
        </Link>
      </div>
    </nav>
  );
}
