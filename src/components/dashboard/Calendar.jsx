import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../store/eventsSlice";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  format,
} from "date-fns";
import { ptBR } from "date-fns/locale";

const Calendar = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const eventStatus = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Component Did Mount
  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchEvents());
    }

    fetchData();
  }, [dispatch]);

  const startMonth = startOfMonth(currentDate);
  const endMonth = endOfMonth(currentDate);
  const startDate = startOfWeek(startMonth);
  const endDate = endOfWeek(endMonth);

  const dates = [];
  let date = startDate;
  while (date <= endDate) {
    dates.push(date);
    date = addDays(date, 1);
  }

  const hasEvent = (date) => {
    const dateString = date.toDateString();
    return events.some((event) => {
      const eventBegin = new Date(event.date_begin).toDateString();
      const eventEnd = new Date(event.date_end).toDateString();
      return dateString >= eventBegin && dateString <= eventEnd;
    });
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentDate(addMonths(currentDate, -1))}
          className="px-4 py-2 bg-gray-200 rounded-md"
        >
          Anterior
        </button>
        <div className="text-lg font-bold">
          {format(currentDate, "MMMM yyyy", { locale: ptBR })}
        </div>
        <button
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          className="px-4 py-2 bg-gray-200 rounded-md"
        >
          Próximo
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    return (
      <div className="grid grid-cols-7 mb-2">
        {days.map((day, index) => (
          <div key={index} className="text-center font-bold">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    return (
      <div className="grid grid-cols-7">
        {dates.map((date, index) => (
          <div
            key={index}
            className={`p-2 border ${
              format(date, "MM") !== format(currentDate, "MM")
                ? "text-gray-400"
                : ""
            } ${hasEvent(date) ? "bg-blue-200" : ""} cursor-pointer`}
          >
            {format(date, "d")}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-100">
      {eventStatus === "loading" && <div>Loading...</div>}
      {eventStatus === "failed" && <div>{error}</div>}
      <div className="bg-white rounded-lg shadow-lg p-4  w-full">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
};

export default Calendar;
