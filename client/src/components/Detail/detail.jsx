import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getId, getDetailId, restorePoke } from "../../actions";
import styles from './detail.module.css';
import Evolution from "../Evolution/Evolution";
export default function Detail() {
  const dispatch = useDispatch();
  const pokeDeits = useSelector((state) => state.details);
  const { id } = useParams();
  // Tengo que crear una accion para que no me cargue por error otra imagen previamente
  useEffect(() => {
    //para acceder al id de ese pokemoncito. tambien se podia un useParams.
    dispatch(getDetailId(id));
    dispatch(restorePoke());
  }, [dispatch, id]);
console.log(pokeDeits);
 /*  console.log(pokeDeits); */
 /* console.log("pokeDeits:", pokeDeits);
  console.log("pokeDeits.evolution:", pokeDeits.evolution); */
  return (
    <div className={styles.detalleBackground}>
      <button className={styles.botones}>
        <Link className={styles.detalleBtn} to="/createpokemon">Back to create pokes</Link>
      </button>

      <button className={styles.botones}>
        <Link className={styles.detalleBtn} to="/home">back to pokes</Link>
      </button>

      <div className={styles.imgCard}>
        {/* object keys te devuelve tremendo array que sirve porque numbers */}
        {Object.keys(pokeDeits).length > 0 ? (
          <div >
            <div >
              <h4 className={styles.detailName}>{pokeDeits[0].name}</h4>
            </div>
            <div >
              <img className={styles.imagen} src={pokeDeits[0].img} alt="" />
            </div>
            <div>
              <div >
                <span className={styles.detailName}>Tipos:</span>  {/* ya no hay problemas */}
                <div className={styles.tipos}>
                {pokeDeits[0].types[0].name} {pokeDeits[0].types[1] && pokeDeits[0].types[1].name}
                </div>
              </div>
              <div className={styles.stats}>
              <span>Id: {pokeDeits[0].id}</span>
              <span>Life: {pokeDeits[0].life}</span>
              <span>Ataque: {pokeDeits[0].attack}</span>
              <span>Defensa: {pokeDeits[0].defense}</span>
              <span>Velocidad: {pokeDeits[0].speed}</span>
              <span>Altura: {pokeDeits[0].height}</span>
              <span>Peso: {pokeDeits[0].weight}</span>
              </div>
            </div>
          </div>
        ) : (
          <p> Almost there</p>
        )}
      </div>
       {/* Render the ShowEvolution component and pass the evolution data as a prop */}
       {pokeDeits.evolution && <Evolution evolution={pokeDeits.evolution} />}
    </div>
  );
}
