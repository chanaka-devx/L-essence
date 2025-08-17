import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../context/useAuth";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5176/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user_data",
        JSON.stringify({ email: formData.email, role: data.role, id: data.user_id })
      );

      login(formData.email, data.role);
      navigate("/tables");
    } catch (err) {
      setError(err.message || "An error occurred during login");
      setFormData({ ...formData, password: "" }); // clear password
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFE0] font-['Playfair_Display'] px-4 sm:px-6">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md border border-[#F4C430] w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl mb-6 text-[#333333] font-semibold text-center">
          User Login
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-[#F4C430] rounded focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-[#F4C430] rounded focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F59E0B] text-white py-2 px-4 rounded hover:bg-[#E08E0B] transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center flex flex-col pt-2">
          <Link to="/usersignup" className="text-[#F59E0B] hover:underline text-sm">
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
