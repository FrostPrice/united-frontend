import { useState } from "react";
import StatusBadge from "./StatusBadge";

const NotificationCard = ({
  status,
  title,
  description,
  date,
  price,
  onMarkAsRead,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="grid grid-cols-4 justify-between items-center p-4 bg-white shadow rounded-lg mb-4">
      <div className="flex items-center">
        <StatusBadge status={status} />
      </div>
      <div>
        <h4 className="font-bold">{title}</h4>
        <p className="text-gray-500">{description}</p>
      </div>
      <div className="text-right">
        <p className="text-gray-500">{date}</p>
        {price && <p className="font-bold">{price}</p>}
      </div>
      <div className="justify-self-end">
        <button
          className="flex items-center content-center focus:outline-none text-2xl font-bold p-2"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          ...
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <button
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
              onClick={onMarkAsRead}
              disabled={status === "viewed"}
            >
              Marcar como lido
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
