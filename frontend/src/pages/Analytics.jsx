import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function Analytics() {

  const data = {

    labels: [
      "Pending",
      "Processing",
      "Delivered"
    ],

    datasets: [

      {
        data: [5,3,8]
      }

    ]

  };

  return (

    <div style={{width:"500px",margin:"auto"}}>

      <h1>Order Analytics</h1>

      <Pie data={data} />

    </div>

  );

}

export default Analytics;