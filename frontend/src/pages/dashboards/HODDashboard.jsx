import Sidebar from "../../components/Sidebar";

const HODDashboard = () => {
  const links = [
    { name: "Dashboard", path: "/hod" },
    { name: "Pending Approvals", path: "/hod/pending" },
    { name: "Hall Details", path: "/hod/halls" },
    { name: "Approved History", path: "/hod/history" },
    { name: "Notices", path: "/hod/notices" },
    { name: "Profile", path: "/hod/profile" },
  ];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar links={links} />
      <div style={{ padding: "30px", width: "100%" }}>
        <h2>HOD Dashboard</h2>
      </div>
    </div>
  );
};

export default HODDashboard;