import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import StudentDashboard from "./pages/dashboards/StudentDashboard";
import LecturerDashboard from "./pages/dashboards/LecturerDashboard";
import HODDashboard from "./pages/dashboards/HODDashboard";
import TODashboard from "./pages/dashboards/TODashboard";

function App() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-grow">
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/student/*"
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/lecturer/*"
            element={
              <ProtectedRoute role="lecturer">
                <LecturerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hod/*"
            element={
              <ProtectedRoute role="hod">
                <HODDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/to/*"
            element={
              <ProtectedRoute role="to">
                <TODashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 Page */}
          <Route path="*" element={
            <div className="flex items-center justify-center h-[60vh]">
              <h1 className="text-3xl font-semibold text-gray-700">
                404 - Page Not Found
              </h1>
            </div>
          } />

        </Routes>
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default App;