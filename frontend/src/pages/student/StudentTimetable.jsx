import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import timetableService from "../../services/timetableService";

const StudentTimetable = () => {
  const { user } = useContext(AuthContext);

  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchTimetable = async () => {
      try {
        setLoading(true);
        const data = await timetableService.getStudentTimetable(user.id);
        setTimetable(data);
      } catch (err) {
        setError("Failed to load timetable.");
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [user]);

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
            className="block bg-indigo-50 text-indigo-600 px-4 py-3 rounded-lg font-medium"
          >
            Timetable
          </Link>

          <Link
            to="/student/notices"
            className="block px-4 py-3 hover:bg-gray-100 rounded-lg"
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

      {/* MAIN */}
      <main className="flex-1 p-8">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Weekly Timetable
          </h1>
          <p className="text-gray-600 mt-1">
            Your personalized class schedule
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">

          {loading && (
            <p className="text-gray-500">Loading timetable...</p>
          )}

          {error && (
            <p className="text-red-500">{error}</p>
          )}

          {!loading && timetable.length === 0 && (
            <p className="text-gray-500">
              No timetable assigned yet.
            </p>
          )}

          {!loading &&
            timetable.map((dayItem) => (
              <div key={dayItem.day} className="mb-10">

                {/* DAY TITLE */}
                <h3 className="text-xl font-semibold mb-4">
                  {dayItem.day}
                </h3>

                <div className="space-y-4">
                  {dayItem.classes.map((classItem) => (
                    <div
                      key={classItem.id}
                      className="border rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between hover:shadow-sm transition"
                    >
                      <div className="text-indigo-600 font-medium md:w-40">
                        {classItem.startTime} - {classItem.endTime}
                      </div>

                      <div className="flex-1">
                        <h4 className="font-semibold">
                          {classItem.subject}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          {classItem.hall} • {classItem.lecturer}
                        </p>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            ))}

        </div>

      </main>
    </div>
  );
};

export default StudentTimetable;