import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [Values, setValues] = useState({
    email: "",
    password: "",
  });

  // utility functions
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };
  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/login",
        Values,
        {
          withCredentials: true,
        },
      );
      localStorage.setItem("userLoggedIn", "yes");
      alert(res.data.success);
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Network/CORS Error";
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="w-[60vw] md:w-[50vw] lg:w-[30vw]">
        <h1 className="text-3xl font-bold text-center mb-1 text-blue-800">
          Taskify
        </h1>
        <h3 className="text-center font-semibold text-slate-600">
          Login with Taskify
        </h3>

        <div className="w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4">
          <form className="flex flex-col gap-4" onSubmit={login}>
            <input
              type="email"
              required
              placeholder="email"
              className="border rounded px-4 py-1 border-slate-400 w-full outline-none"
              name="email"
              value={Values.email}
              onChange={change}
              autoComplete="email"
            />
            <input
              type="password"
              required
              placeholder="password"
              className="border rounded px-4 py-1 border-slate-400 w-full outline-none"
              name="password"
              value={Values.password}
              onChange={change}
              autoComplete="current-password"
            />
            <button
              className="bg-blue-800 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-all duration-300"
              type="submit"
            >
              Login
            </button>
            <p className="text-center font-semibold text-gray-800">
              Don't have an account? <Link to="/register">SignUp</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
