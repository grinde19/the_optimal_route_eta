import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Usuario = {
  id: string;
  nombre: string;
  email: string;
  rol_id: string;
};

type AuthContextType = {
  usuario: Usuario | null;
  token: string | null;
  login: (data: { token: string; usuario: Usuario }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  usuario: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthProviderWithNavigation>{children}</AuthProviderWithNavigation>;
}

function AuthProviderWithNavigation({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) {
      const parsed = JSON.parse(stored);
      setToken(parsed.token);
      setUsuario(parsed.usuario);
    }
  }, []);

  const login = ({ token, usuario }: { token: string; usuario: Usuario }) => {
    setToken(token);
    setUsuario(usuario);
    localStorage.setItem('auth', JSON.stringify({ token, usuario }));

    const adminRoleId = import.meta.env.VITE_ADMIN_ROLE_ID;
    if (usuario.rol_id === adminRoleId) {
      navigate('/admin');
    } else {
      navigate('/mis-rutas');
    }
  };

  const logout = () => {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
