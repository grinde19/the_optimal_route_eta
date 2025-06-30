import MainLayout from '../layouts/MainLayout';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <MainLayout>
      <h2>Iniciar sesión</h2>
      <LoginForm />
    </MainLayout>
  );
}
