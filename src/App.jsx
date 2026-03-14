import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import InterviewSetup from "./pages/InterviewSetup";
import Interview from "./pages/Interview";
import Feedback from "./pages/Feedback";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import Analytics from "./pages/Analytics";
import Features from "./components/Features";
import Leaderboard from "./pages/Leaderboard";
import ResumeUpload from "./pages/ResumeUpload";
import Community from "./pages/Community"
import CreatePost from "./pages/CreatePost"
import ProfileAnalytics from "./pages/ProfileAnalytics"
import InterviewHistory from "./pages/InterviewHistory"

import DashboardLayout from "./layouts/DashboardLayout"
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/features" element={<Features />} />

        {/* Authenticated Pages */}
        <Route element={<DashboardLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/interview-setup" element={<InterviewSetup />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/resume-upload" element={<ResumeUpload />} />
          <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/profile-analytics" element={<ProfileAnalytics/>}/>
          <Route path="/interview-history" element={<InterviewHistory/>}/>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;