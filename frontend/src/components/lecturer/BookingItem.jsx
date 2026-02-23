const BookingItem = ({ title, hall, date, time, status }) => {

  const statusColor = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="flex justify-between items-center border border-gray-200 rounded-lg p-5 hover:shadow-sm transition">

      <div>
        <h4 className="text-md font-semibold text-gray-800">
          {title}
        </h4>
        <p className="text-sm text-gray-500 mt-1">
          {hall} • {date} at {time}
        </p>
      </div>

      <span className={`px-4 py-1 text-sm rounded-full font-medium ${statusColor[status]}`}>
        {status}
      </span>

    </div>
  );
};

export default BookingItem;