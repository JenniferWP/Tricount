import { useNavigate } from "@tanstack/react-router";
import type { Event } from "../types";

type EventProps = {
  event: Event;
};

const Event = ({ event }: EventProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate({ to: `/event/${event.id}` })}
      className="bg-gray-800 rounded-lg shadow p-4 mb-4 text-white cursor-pointer hover:bg-gray-700 active:bg-gray-600"
    >
      <div className="font-bold text-lg mb-2">{event.name}</div>
      <div className="text-sm">
        Du {event.from} au {event.to}
      </div>
    </div>
  );
};

const Planning = () => {
  const initialState: { plannings: Array<Event> } = {
    plannings: [
      { id: 123, name: "Excursion US", from: "01/01", to: "09/01" },
      { id: 124, name: "Séminaire truc", from: "02/02", to: "20/02" },
      { id: 125, name: "Anniversaire Machin", from: "10/02", to: "10/02" },
    ],
  };

  return (
    <div className="p-4 rounded-lg shadow-md m-2 flex-1 bg-gray-900 h-full">
      <div className="text-3xl mb-4 text-center">Mes plannings</div>
      <button className="bg-gray-800 rounded-lg shadow p-4 mb-4 text-white cursor-pointer hover:bg-gray-700 active:bg-gray-600">
        + Créer un planning
      </button>
      {initialState.plannings.map((event) => (
        <Event event={event} />
      ))}
    </div>
  );
};

export default Planning;
