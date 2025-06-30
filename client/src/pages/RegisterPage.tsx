import MainLayout from '../layouts/MainLayout';
import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
  return (
    <MainLayout>
      <h2>Registro de Usuario</h2>
      <RegisterForm />
    </MainLayout>
  );
}