# 🚚 Backend - Express + PostgreSQL

API RESTful para manejar usuarios, roles, rutas y entregas con ETA dinámico calculado.

## 🧪 Tecnologías

- Node.js + Express
- PostgreSQL
- JWT
- OpenRouteService
- Docker

## 📁 Estructura

```
server/
├── controllers/
├── models/
├── routes/
├── services/
├── db/connection.js
├── index.js
└── .env
```

## 🔐 Endpoints principales

| Método | Ruta                     | Descripción                   |
| ------ | ------------------------ | ----------------------------- |
| POST   | `/api/login`             | Login con JWT                 |
| POST   | `/api/usuarios`          | Crear usuario (admin)         |
| GET    | `/api/rutas/disponibles` | Listar rutas sin asignar      |
| POST   | `/api/rutas/:id/asignar` | Asignar ruta a usuario        |
| POST   | `/api/rutas`             | Crear nueva ruta con entregas |
| GET    | `/api/rutas/:id`         | Obtener detalles de una ruta  |

## 🔧 Servicios clave

- `geocodeAddress(dir)`: geocodifica una dirección
- `getTravelTime(origen, destino)`: calcula duración estimada de viaje
- `procesarCreacionRuta`: guarda ruta + ETAs
