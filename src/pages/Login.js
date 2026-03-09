import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {

    const user = JSON.parse(localStorage.getItem("registeredUser"));

    if (user && user.email === email && user.password === password) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded shadow w-80">

        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white p-2 rounded"
        >
          Login
        </button>

        <p className="text-sm mt-3 text-center">
          Don't have an account? <Link to="/register" className="text-indigo-600">Register</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;