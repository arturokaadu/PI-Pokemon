import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemon,
  orderBy,
  orderByType,
  getPokeType,
} from "../../actions/index";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
export default function Home() {
  //para hacer el dispatch de las acciones

  const dispatch = useDispatch();
  //seteamos un estado para poder hacer el refresh de la accion que necesitamos en el select
  const [state, setState] = useState("");
  //para manipular los states
  const allPokemon = useSelector((state) => state.pokemons);
  //allpokemons2 = useSelector ((state) => state.allPokemons)
  const allTypes = useSelector((state) => state.types);

  // Creamos un state con la pagina actual y otro que haga set
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage, setPokemonPerPage] = useState(12); //asi mostramos 12 por pagina
  const indexLastPoke = currentPage * pokemonPerPage;
  const indexFirstPoke = indexLastPoke - pokemonPerPage;
  //para marcar la distancia el slice parte a la mitad.
  const currentPoke = allPokemon.slice(indexFirstPoke, indexLastPoke);
  //para setear la pagina en ese numero de pagina. Helps with rendering
  const paging = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    
    // se va a ejecutar cada vez que ocurra dispatch como en el on mount >// vacio no depende de nada
  useEffect(() => {
    dispatch(getPokemon());
    dispatch(getPokeType());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault(); // para que no se rompa. Just in case.
    dispatch(getPokemon());
  }

  function handleByAttack(e) {
    e.preventDefault(); // para que no se rompa. Just in case.
    dispatch(orderBy(e.target.value));
    setState(e.target.value);
    /* dispatch(getPokemon()); */
}

function handleByType(e) {
    e.preventDefault();
    dispatch(orderByType(e.target.value));
    setCurrentPage(1)
    //setState(e.target.value)
  }
  function handleByName(e) {
    e.preventDefault(); // para que no se rompa. Just in case.
    dispatch();
  }

  return (
    <div>
      <Link to="/createpokemon">
        <h3> Crea Pokemons</h3>
      </Link>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Recarga de Pokemons
      </button>
      <div>
        <select onChange={(e) => handleByAttack(e)}>
          <option> Ordenar Por Ataque</option>
          <option value="ascendente">A-Z</option>
          <option value="descendente">Z-A</option>
          <option value="mayor">+ ataque</option>
          <option value="menor">- ataque</option>
        </select>
      </div>
        {/* cambiamos a current */}
      {currentPoke &&
        currentPoke.map((c) => {
          return (
            <div key={c.id}>
              <Link to={"/home" + c.id}>
                <Card name={c.name} img={c.img} types={c.types} />
              </Link>
            </div>
          );

        })
        
        }

      <div>
         <select onChange={(e) => handleByType(e)}>
          <option value="All">Todos</option> 
          {/* cambiamos al current para que aparezcan los que quiero */}
           {allTypes.map((type) => (
            <option value={type.name} key={type.name}>
              {type.name}
            </option>
          ))}
        </select> 

        {/* le pasamos el length porque necesitamos numeros */}

            <Pagination 
             pokemonPerPage={pokemonPerPage}
             allPokemon={allPokemon.length}
             paging={paging}
            
            />
  <SearchBar
  />
      </div>
    </div>
  );
}






