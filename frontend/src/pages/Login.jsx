import React, { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful!");
      navigate("/");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-bg">

      <div className="auth-card">

        <h2>🔐 Login</h2>
        <p>Welcome back</p>

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <div className="switch">
          Don't have an account?{" "}
          <Link to="/signup">Signup</Link>
        </div>

      </div>

    </div>
  );
}

export default Login;