import React from "react";
import styles from './pagination.module.css'
//pasamos por destructuring lo que necesitamos

//it works

export default function Pagination({
  
  pokemonPerPage,
  allPokemon,
  paging,
}) {
  const pageNumbers = [];

  //math ceil redondea hacia arriba los pokes sobre la cantidad de pokes que se quiere
  // con el resultado del numero redondo de los pokemones por los que quiero y lo pusheamos en el array
  for (let i = 1; i <= Math.ceil(allPokemon/pokemonPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    //necesitamos devolver el numero que corresponda.
    //dentro de la lista revisamos si pageNumbers tiene contenido.
    //cuando hacemos click le pasamos el paging que contiene el numero de pagina
    <nav className={styles.pagination}>
      
        {pageNumbers?.map((number) => (
         <div className="number" key={number}>
                     <button className={styles.btn} onClick={() => paging(number)}>{number}</button>
          
          </div>
        ))
        }
      
    </nav>
  );
}
