# 📦 The Optimal Route ETA

Aplicación completa para planificación de rutas con ETAs (tiempos estimados de llegada) utilizando geocodificación y cálculo de tiempos de viaje con OpenRouteService.

## 🧱 Tecnologías

- Frontend: React + TypeScript
- Backend: Node.js (Express)
- Base de datos: PostgreSQL
- API externa: OpenRouteService
- Autenticación: JWT (contexto) con roles (admin, delivery)
- Docker para entornos locales

---

## 🚀 Levantar el proyecto

Asegúrate de tener Docker y Docker Compose instalados.

```bash
docker-compose up --build
```

Esto levantará:

- `client` en `http://localhost:5173`
- `server` en `http://localhost:3000`

---

## 🔐 Variables de entorno

### Backend (`server/.env`)

```env
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@db:5432/rutas_db
JWT_SECRET=tu_clave_secreta
ADMIN_ROLE_ID=1
ORS_API_KEY=tu_clave_de_openrouteservice
```

### Frontend (`client/.env`)

```env
VITE_API_URL=http://localhost:3000/api
VITE_ADMIN_ROLE_ID=1
```

---

Tanto el VITE_ADMIN_ROLE_ID como el ADMIN_ROLE_ID son el mismo, se debe obtener luego de correr los seeds y crear el admin por default.

## 👤 Roles

- **Admin:** puede crear rutas y usuarios, y asignar rutas a deliveries.
- **Delivery:** puede ver rutas disponibles y tomarlas por cuenta propia.

---

## 🛠 Funcionalidades

- Login con validación
- Crear rutas con múltiples entregas (usando geocodificación)
- Asignar rutas a usuarios (admin o delivery)
- Calcular ETA entre entregas usando OpenRouteService
- Ver rutas asignadas y pendientes
