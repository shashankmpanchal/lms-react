import CardComponent from "../../components/card";

const Dashboard = () => {
  return (
    <>
      <div className="mb-3">Dashboard</div>
      <div className="grid grid-cols-3 gap-4">
        <CardComponent 
          title="Total Leaves"
          leaves="16"
        />
        <CardComponent 
          title="Applied Leaves"
          leaves="6"
        />
        <CardComponent 
          title="Available Leaves"
          leaves="10"
        />
      </div>
    </>
  );
};

export default Dashboard;
