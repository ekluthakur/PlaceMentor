import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">

      <Navbar />

      <Hero />

      <Features />

      <HowItWorks />

      <Footer />

    </div>
  );
}