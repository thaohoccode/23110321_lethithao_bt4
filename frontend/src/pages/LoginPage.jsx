import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("member1@example.com");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-teal-100 via-white to-orange-100 p-4">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">Member Login</h1>
        <input className="mb-3 w-full rounded-lg border p-3" value={email} onChange={(e) => setEmail(e.target.value)} />
        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
        <button className="w-full rounded-lg bg-brand p-3 font-semibold text-white">Dang nhap</button>
      </form>
    </div>
  );
};

export default LoginPage;
