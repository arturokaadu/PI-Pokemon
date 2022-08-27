import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getId, postPoke, getPokeType } from "../../actions";

//necesito validar cada uno de los input con regular expressions
    let emptinessIKM = /\S+/;
    let valuableName =  /^[a-z]+$/i;
    let forNumber =  /^\d+$/;
    let forUrl = /^(ftp|http|https):\/\/[^ "]+$/;

function validated(input){
    let errors = {}
    if (!emptinessIKM.test(input.name) || !valuableName.test(input.name) || input.name.length < 4){
        errors.name = "Debes completar un nombre con mas de 3 caracteres. Sin numeros"

    } // parseInt to return integer 
    if (!forNumber.test(input.life) || parseInt(input.life) <= 1 || parseInt(input.life) >= 300  ){
        errors.life = 'Mas de 1 por favor y menor a 300'
    }  
    
    if(!forNumber.test(input.attack) || parseInt(input.attack) <= 1 || parseInt(input.attack) >= 300 ){
        errors.attack = 'Mas de 1 por favor y menor a 300'
    }
    
    if(!forNumber.test(input.defense) || parseInt(input.defense) <=1  || parseInt(input.defense) >= 300){
        errors.defense = 'Mas de 1 por favor y menor a 300'
    }

    
    if(!forNumber.test(input.speed) || parseInt(input.speed) <=1 || parseInt(input.speed) >= 300 ){
        errors.speed = 'Mas de 1 por favor y menor a 300'
    }
    
    if(!forNumber.test(input.height) || parseInt(input.height) <=1  || parseInt(input.height) >= 250){
        errors.height = 'Mas de 1 por favor y menor a 250. '
    }
    
    if(!forNumber.test(input.weight) || parseInt(input.weight) <= 1 || parseInt(input.weight) >= 1000 ){
        errors.weight = 'Mas de 1 por favor y menor a 1000'
    }

    if (!forUrl.test(input.img)){
        errors.img = 'Es necesaria una URL'
    }
    return errors
}

/* The test() method is a RegExp expression method.

It searches a string for a pattern, and returns true or false, depending on the result */


export default function CreatePoke() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const [errors, setErrors] = useState({a: ""})
  //const allpoke3 = useSelector((state) => state.allpokemons.map(pok => pok.name))

  //redirigimos con history push a la ruta que indiquemos
  const history = useHistory();

  //para guardar el form, y en un objeto le pasamos lo necesario para el post
  // input equals local state, obviously
  const [input, setInput] = useState({
    name: "",
    life: "",
    weight: "",
    height: "",
    speed: "",
    attack: "",
    defense: "",
    img: "",
    // para que se puedan cargar más de un type.
    types: [],
  });
  //para agregar ademas del input agrega un target value de lo que se esté modificando
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
    setErrors(validated({
        ...input,
        [e.target.name]: e.target.value
    }))
  } 

  function handleSelect(e) {
    e.preventDefault();
    //working here so we can choose up to two types, don't know if it works tho
    input.types.length < 2 && !input.types.includes(e.target.value)
      ? setInput({
          ...input,
          types: [...input.types, e.target.value],
        })
      : alert("Hasta dos tipos!!");
  }
  //probamos un handleDelete para eliminar tipos. It really works!!
  function handleDelete(e) {
    setInput({
      ...input,
      types: input.types.filter((element) => element !== e),
    });
  }

  function handleSubmit(e){
    e.preventDefault();
    
    if (
        !errors.name &&
        !errors.life &&
        !errors.attack &&
        !errors.defense &&
        !errors.speed &&
        !errors.height &&
        !errors.weight &&
        !errors.img 
    ) {


    //vamos a ver el input
    dispatch(postPoke(input))
    alert('poke creado')
    setInput({
        name: "",
        life: "",
        weight: "",
        height: "",
        speed: "",
        attack: "",
        defense: "",
        img: "",
        // para que se puedan cargar más de un type.
        types: [],
    })
    history.push('/home')
} else{
    alert('revisa el formulario, por favor')
}
  }


  useEffect(() => {
    dispatch(getPokeType());
  }, [dispatch]);
  //los input tienen que tener id? gran pregunta
  return (
    <div>
      <Link to="/home">
        <button> Regresa a ver todos los pokemons</button>
      </Link>
      <h2> Crea tu pokemoncito!</h2>

      <form onSubmit={(e)=> handleSubmit(e)}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
         {/* renderizamos el error que pusimos en la funcion */}
           {errors.name && (
                        <p>{errors.name}</p>
                    )}
        </div>
        <div>
          <label>hp</label>
          <input
            type="number"
            value={input.life}
            name="life"
            onChange={(e) => handleChange(e)}
          />
           {errors.life && (
                        <p>{errors.life}</p>
                    )}
        </div>
        <div>
          <label> Attack</label>
          <input
            type="number"
            value={input.attack}
            name="attack"
            onChange={(e) => handleChange(e)}
          />
           {errors.attack && (
                        <p>{errors.attack}</p>
                    )}

        </div>

        <div>
          <label>Defense</label>
          <input
            type="number"
            value={input.defense}
            name="defense"
            onChange={(e) => handleChange(e)}
          />
           {errors.defense && (
                        <p>{errors.defense
                        }</p>
                    )}
        </div>

        <div>
          <label>Speed</label>
          <input
            type="numer"
            value={input.speed}
            name="speed"
            onChange={(e) => handleChange(e)}
          />
           {errors.speed && (
                        <p>{errors.speed}</p>
                    )}
        </div>
        <div>
          <label> Weight</label>
          <input
            type="number"
            value={input.weight}
            name="weight"
            onChange={(e) => handleChange(e)}
          />
           {errors.weight && (
                        <p>{errors.weight}</p>
                    )}
        </div>
        <div>
          <label>Height</label>
          <input
            type="number"
            value={input.height}
            name="height"
            onChange={(e) => handleChange(e)}
          />
           {errors.height && (
                        <p>{errors.height}</p>
                    )}
        </div>

        <div>
          <label>Image:</label>
          <input
            type="text"
            value={input.img}
            name="img"
            onChange={(e) => handleChange(e)}
            placeholder=" Image..."
          />
        </div>
        {/* //vamos a seleccionar los tipos */}
        <select onChange={handleSelect}>
          <option>Select type</option>
          {types?.map((e) => {
            return (
              <option key={e.id} value={e.name}>
                {e.name}
              </option>
            );
          })}
        </select>
        <div>
          {/* // para ver lo que se selecciona, i think */}
          <ul>
            <li>{input.types.map((el) => el + " ,")}</li>
          </ul>
          <div>
          { Object.keys(errors).length ?<button  type="submit" disabled >Crear </button>  
             : <button  type="submit" >Crear </button>             
             
            } 


            </div>
        </div>
        <div>
          {/* probamos un input map para borrar */}
          {input.types.map((e) => (
            <div>
              <h1>{e}</h1>
              <button type="reset" onClick={() => handleDelete(e)} value="x">
                X
              </button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
//al crear poke dice poke creado pero se rompe
//work on handle submit, then validations, then check if it works, then detail or pagination and then testing. Afterwards study and have things ready..
//check for more validations so we cant add more than 200 in values