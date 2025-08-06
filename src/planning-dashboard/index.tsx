import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Planning } from "../types";

import NewEvent from "./new-event";
import NewParticipant from "./new-participant";

const PlanningDashboard = () => {
  const [newEventModal, setNewEventModal] = useState(false);
  const [newParticipantModal, setNewParticipantModal] = useState(false);
  const initialState: Planning = {
    id: "",
    title: "",
    description: "",
    dateStart: "",
    dateEnd: "",
    users: [],
    events: [],
  };
  const [state, setState] = useState(initialState);
  const { id } = useParams({ from: "/planning/$id" });
  const { data } = useQuery({
    queryKey: ["planningID"],
    queryFn: () =>
      fetch("http://localhost:3000/planning/" + id).then((res) => res.json()),
  });

  useEffect(() => {
    if (data) setState({ ...data });
  }, [data]);

  return (
    <>
      <div className="flex flex-col flex-1">
        <h1 className="text-3xl text-center mb-12">{state.title}</h1>
        <div className="flex-1 grid grid-cols-3 h-full">
          <div className="p-4 rounded-lg shadow-md m-2 flex-1 bg-gray-900 h-full text-center">
            Calendrier
            <button
              onClick={() => setNewEventModal(!newEventModal)}
              className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow mt-4 transition-colors cursor-pointer"
            >
              Ajouter un évènement
            </button>
          </div>
          <div className="grid grid-cols-1 grid-rows-2 gap-4">
            <div className="p-4 rounded-lg shadow-md m-2 bg-gray-900 h-full text-center">
              Participants
              <button
                onClick={() => setNewParticipantModal(!newParticipantModal)}
                className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow mt-4 transition-colors cursor-pointer"
              >
                Ajouter un participant
              </button>
            </div>

            <div className="p-4 rounded-lg shadow-md m-2 bg-gray-900 h-full text-center">
              Chat
            </div>
          </div>
          <div className="grid grid-cols-1 grid-rows-2 gap-4">
            <div className="p-4 rounded-lg shadow-md m-2 bg-gray-900 h-full text-center">
              Balance
            </div>
            <div className="p-4 rounded-lg shadow-md m-2 bg-gray-900 h-full text-center">
              <p>Récapitulatif</p>
              <div>{state.description}</div>
            </div>
          </div>
        </div>
      </div>
      {newEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <NewEvent />
          <button
            onClick={() => setNewEventModal(false)}
            className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow transition-colors"
          >
            Fermer
          </button>
        </div>
      )}
      {newParticipantModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <NewParticipant />
          <button
            onClick={() => setNewParticipantModal(false)}
            className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow transition-colors"
          >
            Fermer
          </button>
        </div>
      )}
    </>
  );
};

export default PlanningDashboard;
