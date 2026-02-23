import { useEffect, useState } from "react";
import { Search, Calendar } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import toService from "../../services/toService";

const TOHistory = () => {
  const [history, setHistory] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await toService.getHistory();
      setHistory(data || []);
      setFiltered(data || []);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setLoading(false);
    }
  };

  /* FILTER LOGIC  */

  useEffect(() => {
    let data = [...history];

    if (search) {
      data = data.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      data = data.filter((item) => item.status === statusFilter);
    }

    if (fromDate) {
      data = data.filter((item) => item.date >= fromDate);
    }

    if (toDate) {
      data = data.filter((item) => item.date <= toDate);
    }

    setFiltered(data);
  }, [search, statusFilter, fromDate, toDate, history]);

  return (
    <DashboardLayout role="to">
      <div className="space-y-10">

        {/* HEADER  */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            User Approval History
          </h1>
          <p className="text-gray-500 mt-2">
            View approved and rejected user registrations
          </p>
        </div>

        {/* FILTER SECTION */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

          <div className="grid md:grid-cols-4 gap-4">

            {/* SEARCH */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name"
                className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* STATUS FILTER */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            {/* FROM DATE */}
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            />

            {/* TO DATE */}
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            />

          </div>

        </div>

        {/* HISTORY LIST  */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-4">

          {loading ? (
            <p className="text-gray-500">Loading history...</p>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <Calendar size={40} className="mx-auto mb-3 text-gray-300" />
              No history records found.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-xl p-5 flex justify-between items-center hover:shadow-sm transition"
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.role}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {item.date}
                  </p>
                </div>

                <span
                  className={`px-4 py-1 text-xs font-medium rounded-full ${
                    item.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))
          )}

        </div>

      </div>
    </DashboardLayout>
  );
};

export default TOHistory;