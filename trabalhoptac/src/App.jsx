import { useState } from "react";
import "./index.css";

export default function App (){
  const [ideias, setIdeias] = useState([]);
  const[novaIdeia, setNovaIdeia] = useState("");
  const[erro, setErro] = useState("");
  function aoAdicionar (event){
    event.preventDefault();
    if (novaIdeia.trim ()==""){
      setErro("Digite sua ideia");
      return;
    }
    setErro("");
    console.log("Enviado:", novaIdeia);

    const ideia = {
      id:Date.now(),
      texto:novaIdeia,
      feita: false
    };
    setIdeias((atual)=> [...atual, ideia]);
    setNovaIdeia("");
    setErro("");
  }
  function alternar(id){
    setIdeias((atual)=>{
      return atual.map((ideia)=>{
        if(ideia.id==id){
          return{
            ...ideia,
            feita: !ideia.feita
          };
        }
        return ideia
      })

    })
  }

return (
  <main>
    <h1>Painel de Ideias</h1>
    <p>Deixe aqui as suas ideias, elas estâo guardadas.</p>

    <form onSubmit={aoAdicionar}>
      <input 
      type="text"
      value={novaIdeia}
      onChange={(event)=>{
        setNovaIdeia(event.target.value);
        setErro("");
        
      }}
      placeholder="Sua ideia" />
      <button type="submit">Adicionar</button>
    </form>
    {erro && <p>{erro}</p>}

    <ul>
      {ideias.map((ideia) => (
        <li key ={ideia.id}>{ideias.id}
        <input 
        type="checkbox"
        checked = {ideia.feita}
        onChange={() => alternar(ideia.id)} />
        <span
          className={ideia.feita?"concluida" : ""}>
          {ideia.texto}
        </span>
        </li>
      ))}
    </ul>
  </main>
)

}
