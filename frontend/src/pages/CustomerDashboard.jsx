import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function FarmerDashboard() {

  return (

    <>
      <Navbar />

      <div style={{display:"flex"}}>

        <Sidebar />

        <div style={{padding:"20px"}}>

          <h1>Farmer Dashboard</h1>

          <div
            style={{
              display:"grid",
              gridTemplateColumns:
              "repeat(3,1fr)",
              gap:"20px"
            }}
          >

            <div className="card">
              Weather
            </div>

            <div className="card">
              Crop Prediction
            </div>

            <div className="card">
              AI Assistant
            </div>

            <div className="card">
              Marketplace
            </div>

            <div className="card">
              Orders
            </div>

            <div className="card">
              Profile
            </div>

          </div>

        </div>

      </div>

    </>
  );
}

export default FarmerDashboard;