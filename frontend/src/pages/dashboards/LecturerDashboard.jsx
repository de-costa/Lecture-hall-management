import Sidebar from "../../components/Sidebar";

const LecturerDashboard = () => {
  const links = [
    { name: "Dashboard", path: "/lecturer" },
    { name: "Hall Availability", path: "/lecturer/halls" },
    { name: "My Bookings", path: "/lecturer/bookings" },
    { name: "Booking History", path: "/lecturer/history" },
    { name: "Notifications", path: "/lecturer/notifications" },
    { name: "Profile", path: "/lecturer/profile" },
  ];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar links={links} />
      <div style={{ padding: "30px", width: "100%" }}>
        <h2>Lecturer Dashboard</h2>
      </div>
    </div>
  );
};

export default LecturerDashboard;