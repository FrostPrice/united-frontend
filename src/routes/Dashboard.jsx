import Notification from "../components/dashboard/Notification";
import Material from "../components/dashboard/Material";
import Event from "../components/dashboard/Event";
import Calendar from "../components/dashboard/Calendar";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-4">
        <Notification />
      </div>
      <div className="col-span-2">
        <Calendar />
      </div>
      <div className="col-span-2">
        <Material />
      </div>
      <div className="col-span-4">
        {" "}
        <Event />
      </div>
    </div>
  );
};

export default Dashboard;
