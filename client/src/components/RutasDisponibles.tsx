import { useEffect, useState } from 'react';
import { obtenerRutasDisponibles, asignarRutaService } from '../services/rutaService';

interface Ruta {
  id: number;
  origen: string;
  fecha_creacion: string;
  usuario_id: number | null;
}

interface Props {
  rol: 'admin' | 'delivery';
  userId: string;
}

export default function RutasDisponibles({ rol, userId }: Props) {
  const [rutas, setRutas] = useState<Ruta[]>([]);
  const [mensaje, setMensaje] = useState('');
  const [idDeliverySeleccionado, setIdDeliverySeleccionado] = useState<number | null>(null);

  useEffect(() => {
    cargarRutas();
  }, []);

  async function cargarRutas() {
    try {
      const data = await obtenerRutasDisponibles();
      const rutas_info = data.rutas
      setRutas(rutas_info);
    } catch (err: any) {
      setMensaje(err.message);
    }
  }

  async function asignar(rutaId: number) {
    const idAsignar = rol === 'admin' ? idDeliverySeleccionado : userId;
    if (!idAsignar) {
      setMensaje('Selecciona un usuario para asignar la ruta');
      return;
    }

    try {
      await asignarRutaService(rutaId, idAsignar);
      setMensaje('Ruta asignada correctamente');
      cargarRutas();
    } catch (err: any) {
      setMensaje(err.message);
    }
  }

  return (
    <div>
      <h2>Rutas disponibles</h2>
      {mensaje && <p>{mensaje}</p>}

      {rol === 'admin' && (
        <div>
          <label>Asignar a delivery ID: </label>
          <input
            type="number"
            value={idDeliverySeleccionado ?? ''}
            onChange={(e) => setIdDeliverySeleccionado(Number(e.target.value))}
            placeholder="ID del delivery"
          />
        </div>
      )}

      <ul>
        {rutas.map((ruta) => (
          <li key={ruta.id}>
            <strong>Origen:</strong> {ruta.origen} — <em>Creada:</em> {new Date(ruta.fecha_creacion).toLocaleString()}
            <button onClick={() => asignar(ruta.id)} style={{ marginLeft: '1rem' }}>
              {rol === 'admin' ? 'Asignar a delivery' : 'Asignar ruta'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
