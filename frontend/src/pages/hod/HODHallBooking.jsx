import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import hodService from "../../services/hodService";

const HODHallBooking = () => {

  const [form, setForm] = useState({
    hallId: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const handleBook = async () => {
    await hodService.bookHall(form);
    alert("Hall booked successfully.");
  };

  return (
    <DashboardLayout role="hod">
      <div className="space-y-8">

        <h1 className="text-3xl font-semibold">
          Direct Hall Booking
        </h1>

        <div className="bg-white border rounded-2xl p-8 shadow-sm space-y-4">

          <input
            placeholder="Hall ID"
            value={form.hallId}
            onChange={(e) => setForm({ ...form, hallId: e.target.value })}
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="time"
            value={form.startTime}
            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="time"
            value={form.endTime}
            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
            className="w-full border rounded-lg px-4 py-2"
          />

          <button
            onClick={handleBook}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
          >
            Book Hall
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default HODHallBooking;