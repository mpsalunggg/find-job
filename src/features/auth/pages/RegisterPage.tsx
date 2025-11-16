import { Brand } from "@/components/common/Brand";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <section className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Brand />
        <RegisterForm />
      </div>
    </section>
  );
};
export default RegisterPage;
