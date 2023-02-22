import React from "react";
import { Line } from "react-chartjs-2";
//import { useDelayedEffect } from "./useDelayedEffect";
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

type Props = {
  data: {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
    }[];
}
}
const options: {} = {
  maintainAspectRatio: false,
  responsive: false
}; 



export const Graph = (props: Props) => {


  const [showComponent, setShowComponent] = React.useState(1);
const Width :number=  document.documentElement.clientWidth*0.9; 
const Height :number= Width*0.5;
const data = props.data;
React.useEffect(() => {
  setTimeout(() => {
    setShowComponent(1);
    console.log(showComponent)
  }, 1000);
}, [data]);
  return <>
    <Line
      height={Height}
      width={Width}
      data={data}
      options={options}
      id="chart-key" 
    />
  </>
  

}
