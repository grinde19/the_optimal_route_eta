import { useState } from 'react';
import { loginSchema, LoginFormValues } from '../schemas/loginSchema';
import { login as loginRequest } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export default function LoginForm() {
  const { login } = useAuth();
  const [form, setForm] = useState<LoginFormValues>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginSchema.validate(form);
      const res = await loginRequest(form);
      login(res);
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
      <button type="submit">Iniciar sesión</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
