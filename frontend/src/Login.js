import React, { useState } from "react";
import API from "./api";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      const token =
        res.data.token ||
        res.data.data?.token ||
        res.data.accessToken;

      if (!token) {
        alert("Token missing");
        return;
      }

      localStorage.setItem("token", token);
      setToken(token);

    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed");
    }
  };

  const handleDemoFill = () => {
    setEmail("demo@focusflow.com");
    setPassword("demo123");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">

      <div className="bg-slate-800/60 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md">

        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          FocusFlow Login
        </h2>

        <input
          className="w-full p-3 mb-4 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-4 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          onClick={handleDemoFill}
          className="w-full mb-3 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition text-sm"
        >
          Use Demo Account
        </button>

        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold hover:opacity-90 transition"
        >
          Login
        </button>

        <div className="mt-4 text-xs text-gray-400 text-center">
          Demo: demo@focusflow.com / demo123
        </div>

      </div>
    </div>
  );
};

export default Login;