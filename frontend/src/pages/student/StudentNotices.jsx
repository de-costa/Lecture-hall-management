import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import noticeService from "../../services/noticeService";

const StudentNotices = () => {
  const { user } = useContext(AuthContext);

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchNotices = async () => {
      try {
        setLoading(true);
        const data = await noticeService.getStudentNotices(user.id);
        setNotices(data);
      } catch (err) {
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [user]);

  const priorityStyles = {
    high: "border-l-4 border-red-500 bg-red-50",
    medium: "border-l-4 border-yellow-500 bg-yellow-50",
    low: "border-l-4 border-green-500 bg-green-50",
  };

  const badgeStyles = {
    high: "bg-red-100 text-red-600",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r p-6 hidden md:block">
        <nav className="space-y-4">

          <Link
            to="/student"
            className="block px-4 py-3 hover:bg-gray-100 rounded-lg"
          >
            Dashboard
          </Link>

          <Link
            to="/student/timetable"
            className="block px-4 py-3 hover:bg-gray-100 rounded-lg"
          >
            Timetable
          </Link>

          <Link
            to="/student/notices"
            className="block bg-indigo-50 text-indigo-600 px-4 py-3 rounded-lg font-medium"
          >
            Notice Board
          </Link>

          <Link
            to="/student/profile"
            className="block px-4 py-3 hover:bg-gray-100 rounded-lg"
          >
            Profile
          </Link>

        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Notice Board
          </h1>
          <p className="text-gray-600 mt-1">
            Important announcements and updates related to your schedule
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">

          {loading && (
            <p className="text-gray-500">Loading notifications...</p>
          )}

          {error && (
            <p className="text-red-500">{error}</p>
          )}

          {!loading && notices.length === 0 && (
            <p className="text-gray-500">
              No notifications available.
            </p>
          )}

          <div className="space-y-6">
            {!loading &&
              notices.map((notice) => (
                <div
                  key={notice.id}
                  className={`p-6 rounded-xl ${
                    priorityStyles[notice.priority] || "bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {notice.title}
                      </h3>

                      <div className="text-sm text-gray-600 mt-1">
                        {notice.date} • By {notice.author}

                        <span
                          className={`ml-3 text-xs px-3 py-1 rounded-full ${
                            badgeStyles[notice.priority] || "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {notice.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    {notice.message}
                  </p>
                </div>
              ))}
          </div>

        </div>

      </main>
    </div>
  );
};

export default StudentNotices;