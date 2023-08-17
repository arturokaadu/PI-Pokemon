import React from "react";
import styles from "./card.module.css";

export default function Card({ name, img, id, types, createdInDb, attack }) {
  return (
    <div className={styles.cards}>
      <div className={styles.pokemons}>
        <div>
          <h3>{name}</h3>
          {/* <h3> {id}</h3> */}

        </div>
        <div className={styles.imageContainer}>
          <img
            className={styles.pokeImage}
            src={img}
            alt=""
          
          />
        </div>
        <div>Número de Pokemon: {id}</div>
        <div>
          {/* dentro de la primera posicion, 0, tenemos un tipo con su nombre y dentro del 1 otro */}
          <div className={styles.tipos}>
            <h4>{types && types[0].name} {types && types[1] && types[1].name}</h4>
            
          </div>
        </div>
      </div>
    </div>
  );
}
