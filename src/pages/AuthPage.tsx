import AuthLayout from "../layout/AuthLayout";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

interface AuthPageProps {
  mode: "login" | "register";
  onLoginSuccess: () => void;
  onGoToRegister: () => void;
  onRegisterSuccess: () => void;
}

export default function AuthPage({
  mode,
  onLoginSuccess,
  onGoToRegister,
  onRegisterSuccess,
}: AuthPageProps) {
  return (
    <AuthLayout>
      {mode === "login" && (
        <LoginForm
          onSuccess={onLoginSuccess}
          onRegisterClick={onGoToRegister}
        />
      )}

      {mode === "register" && (
        <RegisterForm
          onRegisterSuccess={onRegisterSuccess}
        />
      )}
    </AuthLayout>
  );
}
