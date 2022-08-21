import Graph from './components/graph';
import Title from './components/title'
import React from "react";
import axios from "axios";
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);


/* eslint-disable */
const App = ( ) => {
  const labels = ["1960", "1965", "1970", "1975", "1980", "1985","1990","1995","2000","2005","2010","2015","2020","2025","2030","2035","2040","2045"];
  const [Stateaxios, setStateaxios] = React.useState<number[]>();
  const [TodoufukenNameData, setTodoufukenNameData] = React.useState<string[]>([]);
  const [TodoufukenData,setTodoufukenData] = React.useState<TodoufukenData[]>([]);
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
  const headers = {
    'X-API-KEY': process.env.REACT_APP_API
  }
  let datasetbefore :{
    label: string;
    data: number[];
    borderColor: string;
  }[]=[]
interface TodoufukenData {
  prefCode: number,
  prefName: string
  }


// 各都道府県の名前とidを取得
React.useEffect(() => { 
  {/* @ts-ignore */}
  axios.get(`https://opendata.resas-portal.go.jp/api/v1/prefectures`,{headers: headers}).then((response :AxiosResponse<any, any>) => {

    const todoufukenhash :TodoufukenData[]= response.data.result;
    setTodoufukenData(todoufukenhash);
    let todoufukenname :string[]= [];
    todoufukenhash.forEach(e => {
      todoufukenname.push(e['prefName'])
    });
    setTodoufukenNameData(todoufukenname);

  }).catch((error :string) => {
    alert("エラーが発生しました。"+ error)
  });
}, []);

//グラフに使用するデータをここで取得する
async function getdata(){
  
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
    axios.get(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${v}`,{headers: headers}).then((response :AxiosResponse<any, any>) => {
      const datas :string[] = response.data.result.data[0].data;
      for (let step = 0; step < datas.length; step++) {
      {/* @ts-ignore */}
      datavalue.push(datas[step].value);
      }
      setStateaxios(datavalue);
      
    }).catch((error :string) => {
      alert("エラーが発生しました。"+ error)
    });

    const red :number= Math.floor( Math.random() * 256 ) ;
    const bule :number= Math.floor( Math.random() * 256 ) ;
    const green :number= Math.floor( Math.random() * 256 ) ;
    const rgb = `rgb(${red}, ${bule}, ${green})`;
    const hashdata = Stateaxios;
    const hash: { label: string; data: number[]; borderColor:string;} ={ label: TodoufukenNameData[v-1], data: datavalue, borderColor: rgb};;
    datasetbefore.push(hash);
    /* eslint-disable */
  };

  const graphData = {
    labels: labels,
    datasets: datasetbefore,
  };

  setgraphdata(graphData) ;

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
  
  return (
    <>
  <Title></Title>
  {TodoufukenData.map((data, index) => {
    const prefName :string= data['prefName'];
    const prefCode :number= data['prefCode'];
      return (
        <div key={index} style={sell} className="list-row">
          <input type="checkbox" name="select" onClick={() => getdata()} value={prefCode}  /><p style={p} >{prefName}</p>
        </div>
      );
  })}
      <Graph data={graphdata}></Graph>
    </>
  );
}

export default App;
