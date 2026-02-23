import { Link } from "react-router-dom";

const InfoCard = ({ title, description, icon, color, link }) => {
  return (
    <Link to={link}>
      <div className={`border rounded-xl p-6 shadow-sm hover:shadow-md transition bg-white ${color}`}>

        <div className="flex items-start gap-4">

          <div className="w-12 h-12 rounded-lg bg-white shadow flex items-center justify-center">
            {icon}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {title}
            </h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              {description}
            </p>
          </div>

        </div>

      </div>
    </Link>
  );
};

export default InfoCard;