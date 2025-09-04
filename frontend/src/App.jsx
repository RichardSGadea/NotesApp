import { Routes, Route }  from "react-router-dom";
import Navbar             from "./components/Navbar.jsx";
import NotesList          from "./pages/NotesList.jsx";
import NoteForm           from "./pages/NoteForm.jsx";
import NoteDetail         from './pages/NoteDetail';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
      <div className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<NotesList />} />
          <Route path="/new" element={<NoteForm />} />
          <Route path="/edit/:id" element={<NoteForm />} />
          <Route path="/note/:id" element={<NoteDetail />} />
        </Routes>
      </div>
    </div>
  );
}

