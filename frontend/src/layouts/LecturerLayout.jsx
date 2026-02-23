import { NavLink, Outlet } from "react-router-dom";

const LecturerLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r p-6 space-y-4">

        <NavLink to="/lecturer" end>Dashboard</NavLink>
        <NavLink to="/lecturer/hall-availability">Hall Availability</NavLink>
        <NavLink to="/lecturer/bookings">My Bookings</NavLink>
        <NavLink to="/lecturer/notice-management">Notice Management</NavLink>
        <NavLink to="/lecturer/profile">Profile</NavLink>

      </aside>

      {/* PAGE CONTENT */}
      <main className="flex-1 p-8">
        <Outlet />   
      </main>

    </div>
  );
};

export default LecturerLayout;