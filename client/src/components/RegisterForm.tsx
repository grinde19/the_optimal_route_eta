import { useState } from 'react';
import { useRoles } from '../hooks/useRoles';
import { crearUsuario } from '../services/usuarioService';
import { userSchema, UserFormValues } from '../schemas/userSchema';

export default function RegisterForm() {
  const { roles } = useRoles();
  const [form, setForm] = useState<UserFormValues>({
    nombre: '',
    email: '',
    password: '',
    rol_id: ''
  });
  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await userSchema.validate(form);
      const res = await crearUsuario(form);
      setMensaje(`✅ Usuario creado con ID: ${res.id}`);
    } catch (err: any) {
      setMensaje(`❌ ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre" onChange={handleChange} /><br />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
      <select name="rol_id" onChange={handleChange}>
        <option value="">Seleccione un rol</option>
        {roles.map(r => (
          <option key={r.id} value={r.id}>{r.nombre}</option>
        ))}
      </select><br />
      <button type="submit">Registrar</button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}