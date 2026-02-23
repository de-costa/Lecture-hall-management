import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  History,
  Bell,
  User,
} from "lucide-react";

const HODLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r shadow-sm p-6 hidden md:block">

        <h2 className="text-xl font-bold text-indigo-600 mb-8">
          HOD Panel
        </h2>

        <nav className="space-y-2">

          <SidebarItem
            to="/hod"
            end
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
          />

          <SidebarItem
            to="/hod/hall-schedule"
            icon={<CalendarDays size={18} />}
            label="Hall Schedule"
          />

          <SidebarItem
            to="/hod/history"
            icon={<History size={18} />}
            label="History"
          />

          <SidebarItem
            to="/hod/notices"
            icon={<Bell size={18} />}
            label="Notices"
          />

          <SidebarItem
            to="/hod/profile"
            icon={<User size={18} />}
            label="Profile"
          />

        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>

    </div>
  );
};

const SidebarItem = ({ to, icon, label, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-lg transition
      ${
        isActive
          ? "bg-indigo-50 text-indigo-600 font-medium"
          : "text-gray-600 hover:bg-gray-100"
      }`
    }
  >
    {icon}
    {label}
  </NavLink>
);

export default HODLayout;