import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5176/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user_data", JSON.stringify({
        email: formData.email,
        role: data.role,
        id: data.user_id
      }));
      setSuccessMessage("Signup successful!");

      setTimeout(() => {
        navigate("/tables"); 
      }, 2000);

    } catch (err) {
      setError(err.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFE0] font-['Playfair_Display']">
      <div className="bg-white p-8 rounded-lg shadow-md border border-[#F4C430] w-full max-w-md">
        <h2 className="text-2xl mb-6 text-[#333333] font-semibold text-center">User Sign Up</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-[#F4C430] rounded focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-[#F4C430] rounded focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-[#F4C430] rounded focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-[#F4C430] rounded focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-2 border border-[#F4C430] rounded focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F59E0B] text-white py-2 px-4 rounded hover:bg-[#E08E0B] transition-colors disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/userlogin" className="text-[#F59E0B] hover:underline text-sm">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
