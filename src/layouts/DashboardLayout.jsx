import React from "react";
import { Outlet } from "react-router-dom"
import NavbarUser from "../components/NavbarUser"
import AIMentorChatbot from "../components/AIMentorChatbot"
import { Link, useNavigate } from "react-router-dom";


export default function DashboardLayout() {

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">

      {/* Background Blobs */}

      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>



      {/* Navbar */}

      <NavbarUser />

      {/* Page Content */}

      <div className="p-10 relative z-10">

        <Outlet />

      </div>

      {/* AI Mentor Floating Chatbot */}

      <AIMentorChatbot />

    </div>

  )

}