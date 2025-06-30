import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import RutasPage from './pages/RutasDisponibles';
import PrivateRoute from './components/PrivateRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/mis-rutas" element={<RutasPage />} />
      </Route>

      {/* Catch-all: redirige todo lo no definido a /login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
