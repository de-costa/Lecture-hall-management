import { useState, useContext } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { AuthContext } from "../../context/AuthContext";
import lecturerService from "../../services/lecturerService";
import { Search } from "lucide-react";

const LecturerHallAvailability = () => {
  const { user } = useContext(AuthContext);

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [capacity, setCapacity] = useState("");

  const [halls, setHalls] = useState([]);
  const [allHalls, setAllHalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSearch = async () => {
    setError("");

    if (!date || !startTime || !endTime) {
      return setError("Please select date and time range.");
    }

    if (date < today) {
      return setError("Cannot book hall for past date.");
    }

    if (startTime >= endTime) {
      return setError("End time must be after start time.");
    }

    try {
      setLoading(true);

      const data = await lecturerService.searchAvailableHalls({
        date,
        startTime,
        endTime,
        capacity,
      });

      setHalls(data);
    } catch (err) {
      setError("Failed to search halls.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setDate("");
    setStartTime("");
    setEndTime("");
    setCapacity("");
    setHalls([]);
    setError("");
  };

  const handleBook = async (hallId) => {
    try {
      await lecturerService.bookHall({
        lecturerId: user.id,
        hallId,
        date,
        startTime,
        endTime,
      });

      alert("Hall booked successfully.");
      handleSearch();
    } catch (err) {
      alert("Hall is not available.");
    }
  };

  return (
    <DashboardLayout role="lecturer">
      <div className="space-y-10">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Lecture Hall Availability
          </h1>
          <p className="text-gray-500 mt-2">
            Search and book available lecture halls
          </p>
        </div>

        {/* SEARCH SECTION */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">

          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Search & Filter
            </h2>

            <button
              onClick={handleClear}
              className="text-sm px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Clear Filters
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="grid md:grid-cols-4 gap-6">

            <div>
              <label className="text-sm text-gray-600">Date</label>
              <input
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="mt-1 w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="mt-1 w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Min. Capacity</label>
              <input
                type="number"
                placeholder="e.g. 50"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="mt-1 w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

          </div>

          <button
            onClick={handleSearch}
            className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            <Search size={18} />
            Search Available Halls
          </button>
        </div>

        {/* SEARCH RESULTS */}
        <div>
          <h2 className="text-xl font-semibold mb-6">
            Available Halls ({halls.length})
          </h2>

          {loading ? (
            <p className="text-gray-500">Searching...</p>
          ) : halls.length === 0 ? (
            <p className="text-gray-500">
              No halls available for selected time.
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {halls.map((hall) => (
                <div
                  key={hall.id}
                  className={`rounded-2xl border p-6 transition hover:shadow-md ${
                    hall.available
                      ? "bg-white border-gray-200"
                      : "bg-gray-100 border-gray-200 opacity-70"
                  }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      {hall.name}
                    </h3>

                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        hall.available
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {hall.available ? "Available" : "Booked"}
                    </span>
                  </div>

                  <p className="text-gray-600">
                    Capacity: <strong>{hall.capacity} students</strong>
                  </p>

                  <div className="mt-6">
                    {hall.available ? (
                      <button
                        onClick={() => handleBook(hall.id)}
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                      >
                        Book Hall
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-gray-300 text-gray-600 py-2 rounded-lg cursor-not-allowed"
                      >
                        Not Available
                      </button>
                    )}
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

export default LecturerHallAvailability;