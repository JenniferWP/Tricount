import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { Planning } from "../../types";

type PlanningProps = {
  planning: Planning;
};

const Planning = ({ planning }: PlanningProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate({ to: `/planning/${planning.id}` })}
      className="bg-gray-800 rounded-lg shadow p-4 mb-4 text-white cursor-pointer hover:bg-gray-700 active:bg-gray-600"
    >
      <div className="font-bold text-lg mb-2">{planning.title}</div>
      <div className="text-md mb-2">{planning.description}</div>
      <div className="text-sm">
        Du {planning.dateStart} au {planning.dateEnd}
      </div>
    </div>
  );
};

const fetchPlannings = async (): Promise<Planning[]> => {
  const res = await fetch("http://localhost:3000/plannings");
  if (!res.ok) throw new Error("Erreur lors du chargement des plannings");

  return await res.json();
};

const Plannings = () => {
  const navigate = useNavigate();
  const {
    data: plannings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["plannings"],
    queryFn: fetchPlannings,
  });

  return (
    <div className="p-4 rounded-lg shadow-md m-2 flex-1 bg-gray-900 h-full">
      <div className="text-3xl mb-4 text-center">Mes plannings</div>
      <button
        onClick={() => navigate({ to: "/new-planning" })}
        className="bg-gray-800 rounded-lg shadow p-4 mb-4 text-white cursor-pointer hover:bg-gray-700 active:bg-gray-600"
      >
        + Créer un planning
      </button>
      {isLoading && <div className="text-white">Chargement...</div>}
      {error && <div className="text-red-400">{(error as Error).message}</div>}
      {plannings &&
        plannings.map((planning: Planning) => (
          <Planning key={planning.id} planning={planning} />
        ))}
    </div>
  );
};

export default Plannings;
