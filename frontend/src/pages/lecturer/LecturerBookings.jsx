import { useState, useMemo } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";

const LecturerBookings = () => {

  /* SAMPLE DATA */
  const [bookings] = useState([
    {
      id: "#0001",
      subject: "Software Engineering",
      hall: "Hall A101",
      date: "2026-01-25",
      time: "10:00 AM",
      students: 45,
      status: "Pending",
    },
    {
      id: "#0002",
      subject: "Database Systems",
      hall: "Hall B205",
      date: "2026-01-26",
      time: "2:00 PM",
      students: 60,
      status: "Approved",
    },
    {
      id: "#0003",
      subject: "Web Development",
      hall: "Hall C310",
      date: "2026-01-27",
      time: "9:00 AM",
      students: 80,
      status: "Rejected",
    },
  ]);

  /* FILTER STATE */
  const [activeFilter, setActiveFilter] = useState("Pending");

  /*  COUNTS  */
  const counts = {
    Pending: bookings.filter(b => b.status === "Pending").length,
    Approved: bookings.filter(b => b.status === "Approved").length,
    Rejected: bookings.filter(b => b.status === "Rejected").length,
  };

  /* FILTERED BOOKINGS */
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => b.status === activeFilter);
  }, [bookings, activeFilter]);

  /* STATUS BADGE STYLE  */
  const badgeStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-600";
      case "Rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const tabStyle = (status) => {
    const base =
      "flex justify-between items-center px-6 py-4 rounded-xl cursor-pointer transition font-medium";

    if (activeFilter === status) {
      switch (status) {
        case "Approved":
          return `${base} bg-green-100 border border-green-200`;
        case "Rejected":
          return `${base} bg-red-100 border border-red-200`;
        default:
          return `${base} bg-yellow-100 border border-yellow-200`;
      }
    }

    return `${base} bg-gray-50 hover:bg-gray-100 border border-gray-200`;
  };

  return (
    <DashboardLayout role="lecturer">
      <div className="space-y-10">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            My Bookings
          </h1>
          <p className="text-gray-500 mt-2">
            Manage and track your lecture hall booking requests
          </p>
        </div>

        {/* FILTER SECTION */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Booking Requests
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            View all your booking requests and their status
          </p>

          <div className="grid md:grid-cols-3 gap-6">

            <div
              onClick={() => setActiveFilter("Pending")}
              className={tabStyle("Pending")}
            >
              <span>Pending</span>
              <span className="bg-yellow-200 text-yellow-800 text-sm px-3 py-1 rounded-full">
                {counts.Pending}
              </span>
            </div>

            <div
              onClick={() => setActiveFilter("Approved")}
              className={tabStyle("Approved")}
            >
              <span>Approved</span>
              <span className="bg-green-200 text-green-800 text-sm px-3 py-1 rounded-full">
                {counts.Approved}
              </span>
            </div>

            <div
              onClick={() => setActiveFilter("Rejected")}
              className={tabStyle("Rejected")}
            >
              <span>Rejected</span>
              <span className="bg-red-200 text-red-800 text-sm px-3 py-1 rounded-full">
                {counts.Rejected}
              </span>
            </div>

          </div>
        </div>

        {/* BOOKINGS LIST */}
        <div className="space-y-8">

          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-gray-200 text-gray-500">
              No {activeFilter.toLowerCase()} bookings found.
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {booking.subject}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Booking ID: {booking.id}
                    </p>
                  </div>

                  <span
                    className={`text-sm px-4 py-1 rounded-full ${badgeStyle(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-4 gap-8">

                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Hall</p>
                      <p className="font-medium">{booking.hall}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CalendarDays size={18} className="text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{booking.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium">{booking.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users size={18} className="text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Students</p>
                      <p className="font-medium">{booking.students}</p>
                    </div>
                  </div>

                </div>
              </div>
            ))
          )}

        </div>

      </div>
    </DashboardLayout>
  );
};

export default LecturerBookings;