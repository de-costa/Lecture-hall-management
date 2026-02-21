import Sidebar from "../../components/Sidebar";

const StudentDashboard = () => {
  const links = [
    { name: "Dashboard", path: "/student" },
    { name: "Time Table", path: "/student/timetable" },
    { name: "Notice Board", path: "/student/notices" },
    { name: "Profile", path: "/student/profile" },
  ];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar links={links} />
      <div style={{ padding: "30px", width: "100%" }}>
        <h2>Student Dashboard</h2>
      </div>
    </div>
  );
};

export default StudentDashboard;