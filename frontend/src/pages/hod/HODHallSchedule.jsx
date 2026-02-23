import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import hodService from "../../services/hodService";
import {
  Search,
  CheckCircle,
  XCircle,
  Calendar,
  Clock,
  Users,
  Building2,
} from "lucide-react";

const HODHallSchedule = () => {
  const [filters, setFilters] = useState({
    date: "",
    lecturer: "",
    hall: "",
  });

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await hodService.getPendingRequests();
      setRequests(data || []);
    } catch (err) {
      console.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const handleDecision = async (id, status, lecturerId) => {
    try {
      await hodService.updateRequestStatus(id, status);

      await hodService.sendDecisionNotification({
        lecturerId,
        bookingId: id,
        status,
      });

      fetchRequests();
    } catch (err) {
      console.error("Decision failed");
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredRequests = requests.filter((req) => {
    return (
      (!filters.date || req.date === filters.date) &&
      (!filters.lecturer ||
        req.lecturerName
          .toLowerCase()
          .includes(filters.lecturer.toLowerCase())) &&
      (!filters.hall ||
        req.hallName.toLowerCase().includes(filters.hall.toLowerCase()))
    );
  });

  return (
    <DashboardLayout role="hod">
      <div className="space-y-10">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Hall Schedule
          </h1>
          <p className="text-gray-500 mt-2">
            Review and manage lecturer booking requests
          </p>
        </div>

        {/* SEARCH & FILTER CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Search & Filter
            </h2>

            <button
              onClick={() =>
                setFilters({ date: "", lecturer: "", hall: "" })
              }
              className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100"
            >
              Clear Filters
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
                className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Lecturer Name
              </label>
              <input
                type="text"
                name="lecturer"
                placeholder="Search lecturer"
                value={filters.lecturer}
                onChange={handleFilterChange}
                className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Hall
              </label>
              <input
                type="text"
                name="hall"
                placeholder="Search hall"
                value={filters.hall}
                onChange={handleFilterChange}
                className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

          </div>

          <button className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition">
            <Search size={18} />
            Search Requests
          </button>

        </div>

        {/* REQUEST RESULTS */}
        <div>

          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Pending Approval Requests ({filteredRequests.length})
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading requests...</p>
          ) : filteredRequests.length === 0 ? (
            <p className="text-gray-500">
              No pending booking requests found.
            </p>
          ) : (
            <div className="space-y-6">
              {filteredRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6"
                >

                  <div className="flex justify-between items-start">

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {req.courseName}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Lecturer: {req.lecturerName}
                      </p>
                    </div>

                    <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                      Pending
                    </span>

                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mt-6 text-sm">

                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={16} />
                      {req.date}
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={16} />
                      {req.startTime} - {req.endTime}
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <Building2 size={16} />
                      {req.hallName}
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <Users size={16} />
                      {req.students} Students
                    </div>

                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex gap-4 mt-6">

                    <button
                      onClick={() =>
                        handleDecision(
                          req.id,
                          "approved",
                          req.lecturerId
                        )
                      }
                      className="flex-1 bg-green-600 text-white py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-green-700 transition"
                    >
                      <CheckCircle size={18} />
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        handleDecision(
                          req.id,
                          "rejected",
                          req.lecturerId
                        )
                      }
                      className="flex-1 bg-red-600 text-white py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-red-700 transition"
                    >
                      <XCircle size={18} />
                      Reject
                    </button>

                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </DashboardLayout>
  );
};

export default HODHallSchedule;