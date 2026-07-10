import "./DashboardCard.css";
import DashboardCard from "../components/DashboardCard";

function DashboardCard({ title, value, color }) {
  return (
    <div
      className="dashboard-card"
      style={{ borderTop: `5px solid ${color}` }}
    >
      <h3>{title}</h3>

      <h1>{value}</h1>
    </div>
  );
  <div style={{ marginLeft: "280px", padding: "30px" }}>

    <h1>Farmer Dashboard</h1>

    <div className="dashboard">

        <DashboardCard
            title="Products"
            value={totalProducts}
            color="#4CAF50"
        />

        <DashboardCard
            title="Orders"
            value={totalOrders}
            color="#2196F3"
        />

        <DashboardCard
            title="Pending"
            value={pendingOrders}
            color="#FFC107"
        />

        <DashboardCard
            title="Delivered"
            value={deliveredOrders}
            color="#9C27B0"
        />

    </div>

</div>
}

export default DashboardCard;