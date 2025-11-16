import { Brand } from "@/components/common/Brand";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <section className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Brand />
        <LoginForm />
      </div>
    </section>
  );
};
export default LoginPage;
