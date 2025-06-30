import { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Rutas App</h1>
      <hr />
      {children}
    </div>
  );
}
