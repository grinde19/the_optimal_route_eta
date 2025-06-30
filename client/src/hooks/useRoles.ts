import { useEffect, useState } from 'react';
import { getRoles } from '../services/rolService';

export function useRoles() {
  const [roles, setRoles] = useState<{ id: string; nombre: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRoles()
      .then(setRoles)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { roles, loading };
}
