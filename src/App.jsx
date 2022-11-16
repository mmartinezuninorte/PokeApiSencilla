import {useState, useEffect} from 'react'
import './App.css'

function App() {

  const [pokemones, setPokemones]=useState([])
  const [anterior, setAnterior]=useState(null)
  const [siguiente, setSiguiente]= useState(null)
  const [actual, setActual]= useState('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0')

  useEffect(()=>{
    async function obtenerPokemones(){
      // inicializa la consulta le paso la URL necesaria
      const response = await fetch (actual);
      // de esa informacion en formato bruto, solamente saco la info de Json
      // relevante
      const data = await response.json();
      // obtengo result que es la informacion relevante a mostrar
      // en este caso el vector de pokemones
      const result= (await data.results);
      setPokemones(result)
      setAnterior(data.previous)
      setSiguiente(data.next)
    }
    obtenerPokemones()


  },[actual])

  return (
    <div className="App">
      <h2>Hola mundo</h2>
      <ul>
        {pokemones.map((pokemon)=>{
          return <li>{pokemon.name}</li>
        })}
      </ul>
      <button type="button" className="btn btn-primary" onClick={()=> anterior!==null  &&  setActual(anterior)}>Pag.Anterior</button>
      <button onClick={()=> siguiente!==null  &&  setActual(siguiente)}>Pag.Siguiente</button>
    </div>
  )
}

export default App
