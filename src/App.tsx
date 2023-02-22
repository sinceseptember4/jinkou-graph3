import { Graph } from './components/graph';
import { Title } from './components/title'
import React from "react";
import axios  from "axios";
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);



const App = ( ) => {
  const labels = ["1960", "1965", "1970", "1975", "1980", "1985","1990","1995","2000","2005","2010","2015","2020","2025","2030","2035","2040","2045"];
  const [ApiKey, setApiKey] = React.useState<string | null>("XKTYU01YdTFuFKoRNLlev4Wk6GJAqFgPiv8QaiIM");
  const [SelectNumbers, setSelectNumbers] = React.useState<number[]>([]);
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
    labels: [],
    datasets: [
      {
        label: "",
        data:  [],
        borderColor: "",
      }
    ], 
  });
/**
 *  const headers = {
    'X-API-KEY': process.env.REACT_APP_API
  }
 */
/**
  let datasetbefore :{
    label: string;
    data: number[];
    borderColor: string;
  }[]=[]
   */
interface TodoufukenData {
  prefCode: number,
  prefName: string
  }

  
// 各都道府県の名前とidを取得
React.useEffect(() => { 
  let apiKeyPrompt: string | null = "XKTYU01YdTFuFKoRNLlev4Wk6GJAqFgPiv8QaiIM";
  if(ApiKey===null){
    apiKeyPrompt=window.prompt("apiKeyを入力してください", "");
    setApiKey(apiKeyPrompt);
    console.log(apiKeyPrompt);
  }
  if(apiKeyPrompt!==null){
  axios.get(`https://opendata.resas-portal.go.jp/api/v1/prefectures`,{headers: {'X-API-KEY':apiKeyPrompt}}).then((response) => {

  /**
     * 都道府県データを取得
     * @type {Object}
     * @type prefCode 都道府県の呼出番号
     * @type prefName 都道府県の名前
      */
    const todoufukenhash :TodoufukenData[]= response.data.result;
    /**
     * 都道府県データを取得
     * @type {Object}
     * @type prefCode 都道府県の呼出番号
     * @type prefName 都道府県の名前
     */
    setTodoufukenData(todoufukenhash);
    /**
    * 都道府県ごとの名前が格納されています。
    * @type {Array} 
    */
    let todoufukenname :string[]= [];

    todoufukenhash.forEach(e => {
      todoufukenname.push(e['prefName'])
    });
    /**
    * 都道府県ごとの名前が格納されています。
    * @type {Array} 
    */
    setTodoufukenNameData(todoufukenname);
    
  }).catch((error :string) => {
    alert("エラーが発生しました。apiKeyが間違っている可能性があります"+ error)
  });
}

}, []);

//グラフに使用するデータをここで取得する
/**
async function getData(prefCode :number){
  console.log(prefCode)

         
     *   const elements = document.getElementsByName("select") as NodeListOf<HTMLInputElement>;
  let posts :number[]= [];

  for (let i=0; i<elements.length; i++){
    const checked :boolean = elements[i].checked;
    if  (checked){
      const valuenum= Number(elements[i].value);
      posts.push(valuenum);
    }
  }
    
  datasetbefore =[];
  for await (const v of posts) {

    let datavalue :number[]= [];
    if(apikey!==null) {
    axios.get(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${v}`,{headers: {'X-API-KEY':apikey}})
    .then((response) => {
      const datas = response.data.result.data[0].data;
      for (let step = 0; step < datas.length; step++) {
      datavalue.push(datas[step].value);
      }
      setStateaxios(datavalue);
    }).catch((error :string) => {
      alert("エラーが発生しました。APIKEYが間違っている可能性があります。"+ error)
    });
  }
    const red :number= Math.floor( Math.random() * 256 ) ;
    const bule :number= Math.floor( Math.random() * 256 ) ;
    const green :number= Math.floor( Math.random() * 256 ) ;
    const rgb = `rgb(${red}, ${bule}, ${green})`;
    const hashbefore = Stateaxios;// eslint-disable-line
    const hash: { label: string; data: number[]; borderColor:string;} ={ label: TodoufukenNameData[v-1], data: datavalue, borderColor: rgb};
    datasetbefore.push(hash);
  
  };

  const graphData = {
    labels: labels,
    datasets: datasetbefore,
  };

  setgraphdata(graphData) ;

};
 */
function getData(prefCode :number, ApiKey :string | null){
  let numbers =SelectNumbers;
  numbers.push(prefCode);
  setSelectNumbers(numbers);
  if (ApiKey !== null) {
    let datavalue :number[]= [];
    axios.get(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,{headers: {'X-API-KEY':ApiKey}})
    .then((response) => {
      const datas = response.data.result.data[0].data;
      for (let step = 0; step < datas.length; step++) {
      datavalue.push(datas[step].value);
      }
      //setStateaxios(datavalue);
    }).catch((error :string) => {
      alert("エラーが発生しました。APIKEYが間違っている可能性があります。"+ error)
    });
    const red :number= Math.floor( Math.random() * 256 ) ;
    const blue :number= Math.floor( Math.random() * 256 ) ;
    const green :number= Math.floor( Math.random() * 256 ) ;
    const rgb = `rgb(${red}, ${blue}, ${green})`;
    const hash: { label: string; data: number[]; borderColor:string;} ={ label: TodoufukenNameData[prefCode-1], data: datavalue, borderColor: rgb};
    //console.log(hash);
    let datasets =graphdata.datasets;
    if (datasets[0].label==='') {
      datasets=[]
    }
      datasets.push(hash);
      const graphData = {
        labels: labels,
        datasets: datasets,
      };
    //console.log(graphData);
    setgraphdata(graphData) ;
    
    } else {
      console.error ("apikey が設定されていません")
    }
  
}


function  deleteData(prefCode :number) {
  const search = SelectNumbers.indexOf(prefCode);
  let datasets=graphdata.datasets;
  datasets.splice(search,1);
  const graphData = {
    labels: labels,
    datasets: datasets,
  };

setgraphdata(graphData) ;

}
function judge (prefCode :string, ApiKey:string | null) {
  let e =document.getElementById(prefCode)as HTMLInputElement;
  let num = Number(prefCode);  
  if ( e === null) {
    console.error("都道府県のID取得に失敗しました")
  }else if (e.checked) {

      getData(num, ApiKey);
  } else {
    deleteData(num);
  }

}

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
  <Title/>
  {TodoufukenData.map((data, index) => {
    /**
     * @type {string} 都道府県の名前
     */
    const prefName :string= data['prefName'];
    /**
     * @type {number} 都道府県の呼出番号
     */
    const prefCode :number= data['prefCode'];
    /**
     * @type {string} 都道府県の呼出番号のString型
     */
    const prefCodeID :string= String(prefCode);
      return (
        <div key={index} style={sell} className="list-row">
          <input type="checkbox" name="select" onClick={() => judge(prefCodeID, ApiKey)} id={prefCodeID}  /><p style={p} >{prefName}</p>
        </div>
      );
  })}
      <Graph data={graphdata}></Graph>
    </>
  );
}

export default App;
