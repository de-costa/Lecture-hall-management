import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LEFT SIDE - LOGO + BRAND */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Timelyx Logo" className="h-10 w-auto" />
          <div className="leading-tight">
            <h1 className="text-lg font-semibold text-gray-900">
              Lecture Hall Management System
            </h1>
            <p className="text-xs text-gray-500 tracking-wide">
              Efficient Booking & Scheduling
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-600 transition">
            HOME
          </Link>
          <Link to="/about" className="hover:text-blue-600 transition">
            ABOUT
          </Link>
          <Link to="/contact" className="hover:text-blue-600 transition">
            CONTACT
          </Link>

          <Link
            to="/login"
            className="border border-gray-300 px-4 py-1.5 rounded-md hover:bg-gray-100 transition"
          >
            LOGIN
          </Link>

          <Link
            to="/signup"
            className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition"
          >
            SIGN UP
          </Link>
        </nav>

      </div>
    </header>
  );
};

export default Navbar;