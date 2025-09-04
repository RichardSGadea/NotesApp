import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotesList from "../src/pages/NotesList.jsx";
import axios from "axios";
import "@testing-library/jest-dom";

jest.mock("axios");

beforeEach(() => {
  axios.get.mockImplementation((url) => {
    const search = new URLSearchParams(url.split("?")[1]).get("q");
    let data = [
      { id: 1, title: "Nota 1", content: "Contenido 1", created_at: new Date() },
      { id: 2, title: "Nota 2", content: "Contenido 2", created_at: new Date() },
    ];

    if (search) {
      data = data.filter((note) =>
        note.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    return Promise.resolve({ data: { data } });
  });
});

describe("NotesList Component", () => {
  test("renderiza la lista de notas correctamente", async () => {
    render(
      <MemoryRouter>
        <NotesList />
      </MemoryRouter>
    );

    expect(await screen.findByText("Nota 1")).toBeInTheDocument();
    expect(screen.getByText("Nota 2")).toBeInTheDocument();
  });

  test("filtra notas por búsqueda", async () => {
    render(
      <MemoryRouter>
        <NotesList />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/buscar por título/i);
    fireEvent.change(input, { target: { value: "Nota 1" } });

    expect(await screen.findByText("Nota 1")).toBeInTheDocument();
    expect(screen.queryByText("Nota 2")).toBeNull(); // ahora sí debería desaparecer ✅
  });
});