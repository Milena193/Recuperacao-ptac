import { useState } from "react";
import "./index.css";

export default function App (){
  const [ideias, setIdeias] = useState([]);
  const[novaIdeia, setNovaIdeia] = useState("");
  const[erro, setErro] = useState("");
  function aoAdicionar (event){
    event.preventDefault();
    if (novaIdeia.trim ()==""){
      setErro("Digite sua ideia antes de adicionar.");
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
  function remover(id){
    setIdeias((atual)=>{
      return atual.filter((ideia)=>
        ideia.id !==id)

    });
  }
  const totasIdeias = ideias.length;
  const todasConcluidas = ideias.filter((ideia) => {
    return ideia.feita;
  }).length;



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
      {ideias.map((ideia) => {
        let classe ="";
        if(ideia.feita){
          classe = "concluida";
        }
      
      return(
        <li key ={ideia.id}>
        <input 
        type="checkbox"
        checked = {ideia.feita}
        onChange={() => alternar(ideia.id)} />
        
        <span className={classe} >
          {ideia.texto}
        </span>

        <button type="button"
        onClick={()=> remover(ideia.id)}> X </button>
        </li>
      );
})}
    </ul>
    <footer>
      {`${totasIdeias} ideias no painel . ${todasConcluidas} concluídas`}
    </footer>
  </main>
)

}
