# PI-Pokemon - Single Page Application

![React](https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/-Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/-Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)

**Individual Project - Henry Bootcamp**

![App Screenshot](screenshot.png)

---

<details open>
<summary><strong>🇪🇸 VERSIÓN EN ESPAÑOL</strong></summary>

### 📄 Descripción
Esta es una Single Page Application (SPA) temática de Pokémon. Permite buscar, filtrar, ordenar y crear pokemones. Consume datos de la [PokeAPI](https://pokeapi.co/) y también cuenta con una base de datos local propia para almacenar los pokemones creados por el usuario.

### ✨ Funcionalidades
*   **Landing Page**: Una página de bienvenida con imagen de fondo y botón de ingreso.
*   **Home Page**:
    *   Visualización de tarjetas de Pokémon con imagen, nombre y tipos.
    *   **Buscador**: Encuentra pokemones por nombre exacto.
    *   **Filtros**: Por tipo de producto (fuego, agua, etc.) y por origen (API o Base de Datos).
    *   **Ordenamiento**: Alfabético (A-Z, Z-A) y por Fuerza (Ataque).
    *   **Paginado**: Navegación fluida entre listados.
*   **Detalle**: Vista detallada con ID, estadísticas (vida, ataque, defensa, velocidad), altura, peso y tipos.
*   **Creación**: Formulario controlado para crear nuevos pokemones y asignarle tipos.

### 🛠 Tecnologías
*   **Frontend**: React, Redux, CSS puro (sin librerías externas).
*   **Backend**: Node.js, Express.
*   **Base de Datos**: PostgreSQL, Sequelize.

### 🚀 Instalación
1.  Clonar el repositorio.
2.  Instalar dependencias: `npm install` en carpetas `api` y `client`.
3.  Configurar `.env` en `api` con tus credenciales de PostgreSQL.
4.  Iniciar: `npm start` en ambas carpetas.
</details>

<br>

<details>
<summary><strong>🇬🇧 ENGLISH VERSION</strong></summary>

### 📄 Description
This is a Pokémon-themed Single Page Application (SPA). It allows users to search, filter, sort, and create Pokémons. It consumes data from the [PokeAPI](https://pokeapi.co/) and also uses a local database to store user-created Pokémons.

### ✨ Features
*   **Landing Page**: Welcome screen with background image and entry button.
*   **Home Page**:
    *   Display Pokémon cards with image, name, and types.
    *   **Search**: Find Pokémons by exact name.
    *   **Filters**: By type (fire, water, etc.) and origin (API or Database).
    *   **Sorting**: Alphabetical (A-Z, Z-A) and by Strength (Attack).
    *   **Pagination**: Smooth navigation through lists.
*   **Detail View**: Detailed stats including ID, health, attack, defense, speed, height, weight, and types.
*   **Creation**: Controlled form to create new Pokémons and assign types.

### 🛠 Tech Stack
*   **Frontend**: React, Redux, Pure CSS.
*   **Backend**: Node.js, Express.
*   **Database**: PostgreSQL, Sequelize.

### 🚀 Installation
1.  Clone the repository.
2.  Install dependencies: `npm install` in both `api` and `client` folders.
3.  Configure `.env` in `api` with your PostgreSQL credentials.
4.  Start: `npm start` in both folders.
</details>
