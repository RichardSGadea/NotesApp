# Notes App 📝

Aplicación de notas con **React 19 (frontend)** y **Laravel (backend)**, totalmente dockerizada y con tests de frontend y backend.

---

## 🚀 Tecnologías
- **Frontend:** React 19, React Router DOM 6, TailwindCSS, Axios, Vite
- **Backend:** PHP 8 + Laravel, SQLite
- **Tests:**
  - Frontend: Jest + Testing Library
  - Backend: PHPUnit (Laravel)
- **Infraestructura:** Docker & Docker Compose

---

## 📂 Estructura del proyecto
.
├── backend/ # API Laravel
├── frontend/ # App React con Vite
├── docker-compose.yml
└── README.md


---

## ⚙️ Requisitos previos
- Docker y Docker Compose instalados

---

## ▶️ Cómo ejecutar la aplicación

1. Clona el repositorio:
   ```bash
   git clone <repo_url>
   cd notesapp

2. Levanta los contenedores (frontend + backend):
    ```bash
    docker compose up --build

3. La aplicación quedará disponible en:
    Frontend: http://localhost:5173
    Backend API: http://localhost:8000/api/notes

---

## 🧪 Tests

1. Frontend
    ```bash
    docker compose run frontend npm test

2. Backend
    ```bash
    docker compose run backend php artisan test

---

## 📌 Endpoints principales (Backend Laravel)

GET /api/notes → listar todas las notas

POST /api/notes → crear una nota

GET /api/notes/{id} → obtener una nota por id

PUT /api/notes/{id} → editar una nota

DELETE /api/notes/{id} → borrar una nota

---

## ✅ Funcionalidades

* Listar notas

* Buscar notas por título

* Crear nuevas notas

* Editar notas existentes

* Eliminar notas

* Tests de frontend y backend