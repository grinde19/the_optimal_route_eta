# 🧭 Frontend - React + TypeScript

Aplicación de interfaz para creación y asignación de rutas, login y visualización de entregas.

## 🧪 Tecnologías

- React
- React Router
- Context API (auth)
- Axios (con interceptor)
- Yup + React Hook Form
- TypeScript

## 🚀 Scripts

```bash
npm install
npm run dev
```

## 📁 Estructura

```
client/
├── components/         # Componentes UI reutilizables
├── context/            # AuthContext
├── hooks/              # Custom hooks (si aplica)
├── layouts/            # MainLayout general
├── pages/              # Vistas (LoginPage, AdminPage, MisRutasPage)
├── services/           # Servicios HTTP
└── AppRoutes.tsx       # Rutas protegidas
```

## 🛠 Funcionalidades

- Login de usuario (admin/delivery)
- Vista de rutas disponibles
- Formulario de creación de rutas (admin)
- Registro de nuevos deliveries
- Asignación de rutas desde admin o por delivery mismo
