import React from "react";
import Axios from "axios";


const headers = {
  'X-API-KEY': process.env.REACT_APP_API
}
let datas :string[]= [];

type ChildrenDispatchProps = {
  buttom: (id: string) => void;
};

const p: React.CSSProperties = {
  display: "inline-block",
  width: "100px",
  height: "30px",
  margin: "0",
};
const sell: React.CSSProperties = {
  display: "inline-block",
  cursor: "pointer",
  width: "120px",
  height: "30px",
  margin: "0",
};



const SelectButtom : React.FC<ChildrenDispatchProps> = ({
  buttom,
})  => {
  const [Data,setData] = React.useState<string[]>([]);
  React.useEffect(() => { 
    {/* @ts-ignore */}
    Axios.get(`https://opendata.resas-portal.go.jp/api/v1/prefectures`,{headers: headers}).then((response) => {

      datas = response.data.result
      setData(response.data.result);

    }).catch((error) => {
      alert("エラーが発生しました。"+ error)
    });
  }, []);
  return <>
    {Data.map((data, index) => {
          return (
            <div key={index} style={sell} className="list-row">
              <input type="checkbox" name="select" onClick={() => buttom("id")}value="1"  /><p style={p} >{data}</p>
            </div>
          );
        })}


  </>
  

}

export default SelectButtom;