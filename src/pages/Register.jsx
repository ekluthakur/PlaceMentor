import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
  return (
    <div>
      <Navbar />

      <div className="flex justify-center items-center min-h-screen bg-gray-50">

        <div className="bg-white shadow-xl rounded-xl p-8 w-[400px]">

          <h2 className="text-2xl font-bold text-center mb-6">
            Create Account
          </h2>

          <form className="flex flex-col gap-4">

            <input
              type="text"
              placeholder="Full Name"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              placeholder="Email"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Password"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Select Target Role</option>
              <option>Software Developer</option>
              <option>Frontend Developer</option>
              <option>Data Analyst</option>
              <option>Backend Developer</option>
            </select>

            <button
                onClick={() => navigate("/dashboard")}
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 hover:scale-105 transition"
            >
              Register
            </button>

          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-medium">
              Login
            </a>
          </p>

        </div>

      </div>
    </div>
  );
}