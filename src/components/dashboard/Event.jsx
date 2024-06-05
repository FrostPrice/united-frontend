import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents } from "../../store/eventsSlice";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Events = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);

  // Component Did Mount
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-semibold">Eventos</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nome</th>
            <th className="border px-4 py-2">Início</th>
            <th className="border px-4 py-2">Fim</th>
            <th className="border px-4 py-2">Descrição</th>
          </tr>
        </thead>
        <tbody>
          {events.length === 0 && (
            <tr>
              <td className="border px-4 py-2" colSpan="5">
                Nenhum evento encontrado
              </td>
            </tr>
          )}
          {events.map((event, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{event.title}</td>
              <td className="border px-4 py-2">
                {format(event.date_begin, "d, MMMM yyyy, hh:mm", {
                  locale: ptBR,
                })}
              </td>
              <td className="border px-4 py-2">
                {format(event.date_end, "d, MMMM yyyy, hh:mm", {
                  locale: ptBR,
                })}
              </td>
              <td className="border px-4 py-2">{event.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Events;
