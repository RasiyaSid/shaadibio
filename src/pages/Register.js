import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = () => {

    const user = { name, email, password };

    localStorage.setItem("registeredUser", JSON.stringify(user));

    alert("Registration Successful");

    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded shadow w-80">

        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 mb-3"
          onChange={(e) => setName(e.target.value)}
        />

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
          onClick={handleRegister}
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          Register
        </button>

        <p className="text-sm mt-3 text-center">
          Already have an account? <Link to="/login" className="text-indigo-600">Login</Link>
        </p>

      </div>
    </div>
  );
};

export default Register;