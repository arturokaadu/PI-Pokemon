import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemon,
  orderBy,
  orderByType,
  getPokeType,
  filterDb,
} from "../../actions/index";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./home.module.css";
import logo from "../../assets/icons8-refresh.svg";
import logo2 from "../../assets/Error pokemon.svg";
export default function Home() {
  //para hacer el dispatch de las acciones

  const dispatch = useDispatch();
  //seteamos un estado para poder hacer el refresh de la accion que necesitamos en el select
  const [state, setState] = useState("");
  //para manipular los states
  const allPokemon = useSelector((state) => state.pokemons);
  console.log(allPokemon);
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

  // se va a ejecutar cada vez que ocurra dispatch como en el did mount >// vacio no depende de nada
  useEffect(() => {
    dispatch(getPokemon());
    dispatch(getPokeType());
  }, [dispatch]); //otherwise loop

  function handleClick(e) {
    e.preventDefault(); // para que no se rompa. Just in case.
    dispatch(getPokemon());
    setCurrentPage(1);
  }

  function handleByAttack(e) {
    e.preventDefault(); // para que no se rompa. Just in case.
    dispatch(orderBy(e.target.value));
    setState(e.target.value);
    setCurrentPage(1);
    /* dispatch(getPokemon()); */
  }

  function handleByType(e) {
    e.preventDefault();
    dispatch(orderByType(e.target.value));
    setCurrentPage(1);
    //setState(e.target.value)
  }
  /*  function handleByName(e) {
    e.preventDefault(); // para que no se rompa. Just in case.
    dispatch();
  } */

  function handleFilter(e) {
    dispatch(filterDb(e.target.value));
    setCurrentPage(1);
  }

  return (
    <div className={styles.cardContainer}>
      <Link to="/createpokemon" className={styles.createpoke}>
        <h3> Crea nuevos Pokemons! +</h3>
      </Link>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
        className={styles.recarga}
      >
        Recarga
      </button>
      <div>
        <select
          className={styles.selectAttack}
          onChange={(e) => handleByAttack(e)}
        >
          <option>Ordenar alfabeticamente</option>
          <option value="ascendente">A-Z</option>
          <option value="descendente">Z-A</option>
          <option> Ordenar Por Ataque</option>
          <option value="mayor">+ ataque</option>
          <option value="menor">- ataque</option>
        </select>
      </div>
      {/* cambiamos a current */}
      <div className={styles.card}>
        {/* cambiamos al current para que aparezcan los que quiero */}
        {currentPoke.length === 0 ? (
          <img
            className={styles.image}
            src={logo2}
            alt="No hay pokemones"
          ></img>
        ) : (
          currentPoke.map((c) => {
            return (
              <div className={styles.cardFormat} key={c.id}>
                <Link className={styles.name} to={"/home" + c.id}>
                  <Card
                    name={c.name}
                    img={c.img}
                    types={c.types}
                    attack={c.attack}
                  />
                </Link>
              </div>
            );
          })
        )}

        {/*    {console.log(currentPoke)} */}
      </div>

      <select className={styles.selectTipos} onChange={(e) => handleByType(e)}>
        <option className={styles.tipos} value="All">
          Tipos de pokemon
        </option>
        {allTypes.map((type) => (
          <option value={type.name} key={type.name}>
            {type.name}
          </option>
        ))}
      </select>

      <select className={styles.selectApi} onChange={(e) => handleFilter(e)}>
        <option value="All">Api / Creados</option>
        <option value="api">api</option>
        <option value="Created">Created</option>
      </select>

      {/* le pasamos el length porque necesitamos numeros */}
      <div className={styles.pagination}>
        <Pagination
          pokemonPerPage={pokemonPerPage}
          allPokemon={allPokemon.length}
          paging={paging}
        />
      </div>
      <div className={styles.searchB}>
        <SearchBar />
      </div>
    </div>
  );
}
// falta el select de api y created in db. Just that y estilos

//los creados no entran el el filter y no se acomodan alfabeticamente.
// los tipos que no estan me traen 0 a la pagina 1 ---> se resolvio agregando la imagen. No se renderizaba bien el contenido por pagina tampoco
