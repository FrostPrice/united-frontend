import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../store/eventsSlice";
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
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (eventStatus === "idle") {
      dispatch(fetchEvents());
    }
  }, [eventStatus, dispatch]);

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

  const eventsForSelectedDate = events.filter((event) => {
    const eventBegin = new Date(event.date_begin);
    const eventEnd = new Date(event.date_end);
    return (
      selectedDate >= eventBegin.setHours(0, 0, 0, 0) &&
      selectedDate <= eventEnd.setHours(23, 59, 59, 999)
    );
  });

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
            onClick={() => setSelectedDate(date)}
          >
            {format(date, "d")}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 h-screen">
      {eventStatus === "loading" && <div>Loading...</div>}
      {eventStatus === "failed" && <div>{error}</div>}
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-4xl w-full">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
      {eventStatus === "succeeded" && (
        <div className="mt-4 w-full max-w-4xl bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">
            Eventos em {format(selectedDate, "PPPP", { locale: ptBR })}:
          </h2>
          {eventsForSelectedDate.length > 0 ? (
            <ul className="list-disc list-inside">
              {eventsForSelectedDate.map((event) => (
                <li
                  key={event.id}
                  className="bg-white p-4 rounded-lg shadow-md mb-2"
                >
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-gray-600">
                    {new Date(event.date_begin).toLocaleTimeString("pt-BR")} -{" "}
                    {new Date(event.date_end).toLocaleTimeString("pt-BR")}
                  </p>
                  <p>{event.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Não há eventos para este dia.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar;
