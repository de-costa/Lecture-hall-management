import Sidebar from "../../components/Sidebar";

const TODashboard = () => {
  const links = [
    { name: "Dashboard", path: "/to" },
    { name: "Pending Users", path: "/to/pending" },
    { name: "Approved Users", path: "/to/approved" },
    { name: "Notifications", path: "/to/notifications" },
    { name: "Profile", path: "/to/profile" },
  ];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar links={links} />
      <div style={{ padding: "30px", width: "100%" }}>
        <h2>TO Dashboard</h2>
      </div>
    </div>
  );
};

export default TODashboard;