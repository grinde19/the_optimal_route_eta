import { useState } from 'react';
import { crearRutaService } from '../services/rutaService';

export default function CrearRutaForm() {
  const [origen, setOrigen] = useState('');
  const [entregas, setEntregas] = useState([{ direccion: '', cliente: '' }]);
  const [mensaje, setMensaje] = useState('');

  const handleEntregaFieldChange = (
    index: number,
    field: 'direccion' | 'cliente',
    value: string
  ) => {
    const nuevasEntregas = [...entregas];
    nuevasEntregas[index][field] = value;
    setEntregas(nuevasEntregas);
  };

  const agregarEntrega = () => {
    setEntregas([...entregas, { direccion: '', cliente: '' }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await crearRutaService({ origen, entregas });
      setMensaje('✅ Ruta creada con éxito');
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al crear la ruta');
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <label>Dirección de origen:</label><br />
      <input
        value={origen}
        onChange={(e) => setOrigen(e.target.value)}
        required
      /><br /><br />

      <h4>Entregas:</h4>
      {entregas.map((entrega, index) => (
        <div key={index}>
          <input
            placeholder={`Cliente #${index + 1}`}
            value={entrega.cliente}
            onChange={(e) => handleEntregaFieldChange(index, 'cliente', e.target.value)}
            required
          />
          <input
            placeholder={`Dirección entrega #${index + 1}`}
            value={entrega.direccion}
            onChange={(e) => handleEntregaFieldChange(index, 'direccion', e.target.value)}
            required
          />
          <br /><br />
        </div>
      ))}

      <button type="button" onClick={agregarEntrega}>+ Agregar entrega</button><br /><br />
      <button type="submit">Crear ruta</button>

      {mensaje && <p style={{ color: mensaje.startsWith('✅') ? 'green' : 'red' }}>{mensaje}</p>}
    </form>
  );
}
