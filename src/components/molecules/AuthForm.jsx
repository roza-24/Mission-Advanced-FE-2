import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { Link } from "react-router-dom";

export default function AuthForm({
  title,
  buttonText,
  redirectText,
  redirectLink,
}) {
  return (
    <div className="max-w-md w-full bg-white p-8 shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>

      <div className="flex flex-col gap-4">
        <Input label="Email" type="email" placeholder="Email kamu" />
        <Input
          label="Password"
          type="password"
          placeholder="Masukkan password"
        />
      </div>

      <Button className="mt-4">{buttonText}</Button>

      <p className="text-center mt-4 text-sm">
        {redirectText}{" "}
        <Link className="text-blue-600 font-medium" to={redirectLink}>
          Klik di sini
        </Link>
      </p>
    </div>
  );
}
