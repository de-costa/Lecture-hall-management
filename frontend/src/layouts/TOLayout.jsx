import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  History,
  Bell,
  User,
} from "lucide-react";

const TOLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r shadow-sm p-6 hidden md:block">

        {/* PANEL TITLE */}
        <h2 className="text-xl font-bold text-indigo-600 mb-8">
          TO Panel
        </h2>

        {/* NAVIGATION */}
        <nav className="space-y-2">

          <SidebarItem
            to="/to"
            end
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
          />

          <SidebarItem
            to="/to/pending-users"
            icon={<Users size={18} />}
            label="Pending Users"
          />

          <SidebarItem
            to="/to/history"
            icon={<History size={18} />}
            label="Approval History"
          />

          <SidebarItem
            to="/to/notices"
            icon={<Bell size={18} />}
            label="Notices"
          />

          <SidebarItem
            to="/to/profile"
            icon={<User size={18} />}
            label="Profile"
          />

        </nav>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>

    </div>
  );
};

export default TOLayout;

/* SIDEBAR ITEM COMPONENT */

const SidebarItem = ({ to, icon, label, end }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
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
};