const DashboardCard = ({ title, value, icon, bg }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 flex justify-between items-center shadow-sm hover:shadow-md transition">

      <div>
        <p className="text-sm text-gray-500 font-medium">
          {title}
        </p>
        <h3 className="text-3xl font-semibold text-gray-800 mt-2">
          {value}
        </h3>
      </div>

      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bg}`}>
        {icon}
      </div>

    </div>
  );
};

export default DashboardCard;