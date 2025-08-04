import Planning from "./components/Planning";
import Agenda from "./components/Agenda";
import Account from "./components/Account";

const Dashboard = () => {
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="text-3xl text-center mb-12">Planning Tracker</h1>
      <div className="flex-1 grid grid-cols-3 h-full">
        <Planning />
        <Agenda />
        <Account />
      </div>
    </div>
  );
};

export default Dashboard;
