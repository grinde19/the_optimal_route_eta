export function requireAdmin(req, res, next) {
  if (req.user?.rol_id !== process.env.ADMIN_ROLE_ID) {
    return res.status(403).json({ error: 'Solo accesible para administradores' });
  }
  next();
}
