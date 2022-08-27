import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useParams } from "react-router-dom";
import { getId, restorePoke } from "../../actions";

export default function Detail(){
  const dispatch = useDispatch();
  const pokeDeits = useSelector((state) => state.details);
   const {id} = useParams();   
   // Tengo que crear una accion para que no me cargue por error otra imagen previamente
  useEffect(() => {
    //para acceder al id de ese pokemoncito. tambien se podia un useParams.
    dispatch(getId(id));
    dispatch(restorePoke())
  }, [dispatch, id]);

  console.log(pokeDeits)
  return (
    <div>
      <button>
        <Link to="/createpokemon">Back to create pokes</Link>
      </button>

      <button>
        <Link to="/home">back to pokes</Link>
      </button>

      <div>
        {/* object keys te devuelve tremendo array que sirve */}
        {Object.keys(pokeDeits).length > 0 ? (
          <div>
            <div>
              <h2>{pokeDeits[0].name}</h2>
            </div>
            <div>
              <img src={pokeDeits[0].img} alt="" />
            </div>
            <div>
              <h3>
                Tipos:{" "}
                {/* hay problemas */}
               
               
                {
                  pokeDeits[0].types[0].name 
                                 
                 }
                 {pokeDeits[0].types[1] &&
                   pokeDeits[0].types[1].name
}
              </h3>
              <h4>Id: {pokeDeits[0].id}</h4>
              <h4>Hp: {pokeDeits[0].life}</h4>
              <h4>Ataque: {pokeDeits[0].attack}</h4>
              <h4>Defensa: {pokeDeits[0].defense}</h4>
              <h4>Velocidad: {pokeDeits[0].speed}</h4>
              <h4>Altura: {pokeDeits[0].height}</h4>
              <h4>Peso: {pokeDeits[0].weight}</h4>
            </div>
          </div>
        ) : 
          <p> Almost there</p>
        }
      </div>
    </div>
  );
}
