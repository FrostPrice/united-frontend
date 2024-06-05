import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents } from "../../store/eventsSlice";

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
            <th className="border px-4 py-2">Custo</th>
            <th className="border px-4 py-2">Público</th>
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
              <td className="border px-4 py-2">{event.name}</td>
              <td className="border px-4 py-2">{event.start}</td>
              <td className="border px-4 py-2">{event.end}</td>
              <td className="border px-4 py-2">{event.cost}</td>
              <td className="border px-4 py-2">{event.audience}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Events;
