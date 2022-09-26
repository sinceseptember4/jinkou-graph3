import React from "react";
import { Line } from "react-chartjs-2";
import { useDelayedEffect } from "./useDelayedEffect";
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


const Width :number=  document.documentElement.clientWidth*0.9; 
const Height :number= Width*0.5;


export const Graph = (props: Props) => {
  
  const [graphdata, setgraphdata] = React.useState< {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
    }[];
  }>({labels:[],datasets:[]});

  let graphData = props.data;

  useDelayedEffect(() => {
      setgraphdata(graphData)
    },[graphData],500);
    
    

  return <>
    <Line
      height={Height}
      width={Width}
      data={graphdata}
      options={options}
      id="chart-key" 
    />
  </>
  

}
