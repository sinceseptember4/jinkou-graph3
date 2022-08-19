import Graph from './components/graph';
import SelectButtom from "./components/selectbuttom"
import React from "react";
import axios from "axios";
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);


const App: React.FC = ( ) => {
  const labels = ["1960", "1965", "1970", "1975", "1980", "1985","1990","1995","2000","2005","2010","2015","2020","2025","2030","2035","2040","2045"];
  const [graphdata, setgraphdata] = React.useState< {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
    }[];
}>({
  labels: labels,
  datasets: [
    {
      label: "",
      data:  [],
      borderColor: "",
    }
  ],
});

  const [Stateaxios, setStateaxios] = React.useState<number[]>();
  const todoufuken = ["北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県"]
  const headers = {
    'X-API-KEY': process.env.REACT_APP_API
  }
  let datasetbefore :{
    label: string;
    data: number[];
    borderColor: string;
}[]=[]

async function async(){
  
  const elements = document.getElementsByName("select")as NodeListOf<HTMLElement>;

  let posts :never[]= [];
  for (let i=0; i<elements.length; i++){
      {/* @ts-ignore */}
    if (elements[i].checked){
      {/* @ts-ignore */}
      posts.push(elements[i].value);
    }
  }

  datasetbefore =[];
  for await (const v of posts) {
  
    let datavalue :number[]= [];
    {/* @ts-ignore */}
    axios.get(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${v}`,{headers: headers}).then((response) => {
      let datas :string[]= [];
      datas = response.data.result.data[0].data;
      for (let step = 0; step < datas.length; step++) {
      {/* @ts-ignore */}
      datavalue.push(datas[step].value);
      }
      setStateaxios(datavalue);
      
    }).catch((error) => {
      alert("エラーが発生しました。"+ error)
    });
    const red :number= Math.floor( Math.random() * 256 ) ;
    const bule :number= Math.floor( Math.random() * 256 ) ;
    const green :number= Math.floor( Math.random() * 256 ) ;
    const rgb = `rgb(${red}, ${bule}, ${green})`;
    const hash: { label: string; data: number[]; borderColor:string;} ={ label: todoufuken[v-1], data: datavalue, borderColor: rgb};;
    datasetbefore.push(hash);
    
  };

  const graphData = {
    labels: labels,
    datasets: datasetbefore,
  };

  setgraphdata(graphData) ;

};

const  buttom =  () => {
  async();
}

  const options: {} = {
    maintainAspectRatio: false,
    responsive: false
  };


  const Selectstyle: React.CSSProperties = {
    display: "inline-block",
    width: document.documentElement.clientWidth*0.9,
    height: "50px",
    margin: "10px",
  };
  const p: React.CSSProperties = {
    display: "inline-block",
    width: "100px",
    height: "30px",
    margin: "0",
  };
  const sell: React.CSSProperties = {
    display: "inline-block",
    width: "120px",
    height: "30px",
    margin: "0",
  };
  const Width :number=  document.documentElement.clientWidth*0.9; 
  const Height :number= Width*0.5;



  return (
    <>
  <div style={Selectstyle}>
  <label>
      <div style={sell}><input type="checkbox" name="select" value="1"/><p style={p} >北海道</p></div>
      <div style={sell}><input type="checkbox" name="select" value="2"/><p style={p}>青森県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="3"/><p style={p}>岩手県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="4"/><p style={p}>宮城県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="5"/><p style={p}>秋田県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="6"/><p style={p}>山形県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="7"/><p style={p}>福島県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="8"/><p style={p}>茨城県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="9"/><p style={p}>栃木県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="10"/><p style={p}>群馬県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="11"/><p style={p}>埼玉県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="12"/><p style={p}>千葉県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="13"/><p style={p}>東京都</p></div>
      <div style={sell}><input type="checkbox" name="select" value="14"/><p style={p}>神奈川県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="15"/><p style={p}>新潟県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="16"/><p style={p}>富山県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="17"/><p style={p}>石川県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="18"/><p style={p}>福井県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="19"/><p style={p}>山梨県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="20"/><p style={p}>長野県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="21"/><p style={p}>岐阜県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="22"/><p style={p}>静岡県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="23"/><p style={p}>愛知県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="24"/><p style={p}>三重県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="25"/><p style={p}>滋賀県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="26"/><p style={p}>京都府</p></div>
      <div style={sell}><input type="checkbox" name="select" value="27"/><p style={p}>大阪府</p></div>
      <div style={sell}><input type="checkbox" name="select" value="28"/><p style={p}>兵庫県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="29"/><p style={p}>奈良県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="30"/><p style={p}>和歌山県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="31"/><p style={p}>鳥取県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="32"/><p style={p}>島根県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="33"/><p style={p}>岡山県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="34"/><p style={p}>広島県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="35"/><p style={p}>山口県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="36"/><p style={p}>徳島県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="37"/><p style={p}>香川県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="38"/><p style={p}>愛媛県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="39"/><p style={p}>高知県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="40"/><p style={p}>福岡県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="41"/><p style={p}>佐賀県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="42"/><p style={p}>長崎県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="43"/><p style={p}>熊本県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="44"/><p style={p}>大分県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="45"/><p style={p}>宮崎県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="46"/><p style={p}>鹿児島県</p></div>
      <div style={sell}><input type="checkbox" name="select" value="47"/><p style={p}>沖縄県</p></div>

  </label>

  </div>
        <input type="button" value="select" onClick={() => buttom()}/>
        <Graph data={graphdata}></Graph>
        

    </>
  );
}

export default App;
