import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/placementor-logo.png";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-white shadow">

      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={()=>navigate("/landing")}
      >

      <img
        src={logo}
        alt="PlaceMentor"
        className="h-12 w-auto object-contain"
      />

      <span className="text-xl font-bold text-purple-600">
        PlaceMentor
      </span>

      </div>

      {/* Navigation Links */}
      <div className="flex gap-6 items-center">
        <Link to="/home" className="hover:text-blue-600">
          Home
        </Link>

        <Link to="/features" className="hover:text-blue-600">
          Features
        </Link>
    </div>

      {/* Auth Buttons */}
      <div className="flex gap-4 ">
        <Link
          to="/register"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </Link>

        <Link
          to="/login"
          className="px-4 py-2 border border-blue-600 text-blue-600 rounded"
        >
          Login
        </Link>

      </div>

    </nav>
  );
}