import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import hodService from "../../services/hodService";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
} from "lucide-react";

const HODHistory = () => {
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("approved");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await hodService.getHistory();
      setHistory(data || []);
    } catch (err) {
      console.error("Failed to fetch history");
    } finally {
      setLoading(false);
    }
  };

  const filteredData =
    activeTab === "all"
      ? history
      : history.filter((item) => item.status === activeTab);

  const countByStatus = (status) =>
    history.filter((item) => item.status === status).length;

  return (
    <DashboardLayout role="hod">
      <div className="space-y-10">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Approval History
          </h1>
          <p className="text-gray-500 mt-2">
            View all approved and rejected booking decisions
          </p>
        </div>

        {/* SUMMARY STATUS TABS */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Booking Decisions
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Review historical booking approvals and rejections
          </p>

          <div className="flex gap-6">

            <StatusTab
              label="Approved"
              count={countByStatus("approved")}
              active={activeTab === "approved"}
              onClick={() => setActiveTab("approved")}
              activeColor="bg-green-100 text-green-700 border-green-200"
            />

            <StatusTab
              label="Rejected"
              count={countByStatus("rejected")}
              active={activeTab === "rejected"}
              onClick={() => setActiveTab("rejected")}
              activeColor="bg-red-100 text-red-700 border-red-200"
            />

            <StatusTab
              label="All"
              count={history.length}
              active={activeTab === "all"}
              onClick={() => setActiveTab("all")}
              activeColor="bg-indigo-100 text-indigo-700 border-indigo-200"
            />

          </div>

        </div>

        {/* HISTORY LIST */}
        {loading ? (
          <p className="text-gray-500">Loading history...</p>
        ) : filteredData.length === 0 ? (
          <p className="text-gray-500">
            No records available.
          </p>
        ) : (
          <div className="space-y-6">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6"
              >

                {/* TOP ROW */}
                <div className="flex justify-between items-start">

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.courseName}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Booking ID: #{item.id}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-1 text-xs rounded-full font-medium
                      ${
                        item.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {item.status.charAt(0).toUpperCase() +
                      item.status.slice(1)}
                  </span>

                </div>

                {/* DETAILS GRID */}
                <div className="grid md:grid-cols-4 gap-6 mt-6 text-sm">

                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={16} />
                    <div>
                      <p className="text-xs text-gray-400">Hall</p>
                      <p className="font-medium text-gray-900">
                        {item.hallName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} />
                    <div>
                      <p className="text-xs text-gray-400">Date</p>
                      <p className="font-medium text-gray-900">
                        {item.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} />
                    <div>
                      <p className="text-xs text-gray-400">Time</p>
                      <p className="font-medium text-gray-900">
                        {item.startTime} - {item.endTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Users size={16} />
                    <div>
                      <p className="text-xs text-gray-400">Students</p>
                      <p className="font-medium text-gray-900">
                        {item.students}
                      </p>
                    </div>
                  </div>

                </div>

                {/* DECISION INFO */}
                <div className="mt-4 text-xs text-gray-400">
                  Decision Date: {item.decisionDate}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default HODHistory;


const StatusTab = ({
  label,
  count,
  active,
  onClick,
  activeColor,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-between px-6 py-3 rounded-xl border transition
        ${
          active
            ? `${activeColor}`
            : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
        }`}
    >
      <span className="font-medium">{label}</span>

      <span className="ml-4 px-3 py-1 text-xs rounded-full bg-white shadow-sm">
        {count}
      </span>
    </button>
  );
};