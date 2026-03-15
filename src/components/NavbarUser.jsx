import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/placementor-logo.png";

export default function NavbarUser() {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">

      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={()=>navigate("/")}
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

      {/* Menu */}
      <div className="flex gap-6 items-center">

        <Link to="/" className="hover:text-blue-600">Dashboard</Link>
        <Link to="/interview-setup" className="hover:text-blue-600">Interview</Link>
        <Link to="/resume-upload" className="hover:text-blue-600">Resume</Link>
        <Link to="/analytics" className="hover:text-blue-600">Analytics</Link>
        <Link to="/leaderboard" className="hover:text-blue-600">Leaderboard</Link>
        <Link to="/community" className="hover:text-blue-600">Community</Link>
        <button
          onClick={()=>navigate("/profile")}
          className="text-gray-700 hover:text-purple-600"
        >
          👤
        </button>


      </div>

    </nav>
  );
}