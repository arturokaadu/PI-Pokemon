  import axios from 'axios';
//const axios = require( 'axios')


//variables de action types
/* export const GET_POKE = "GET_POKE"
export const ORDER_ATTACK_POKE = "ORDER_ATTACK_POKE"
export const ORDER_BY_TYPE = "ORDER_BY_TYPE" */

// redux thunk sirve para trabajar con la llamada asincrona 

export function getPokemon() {
  return async (dispatch) => {
      try {
          var pokemon = await axios('http://localhost:3001/pokemons');
          return dispatch({
              type: "GET_POKEMON",
              payload: pokemon.data
              //representado en sservice el payload state.somethingneeded = payload.somethinneeded
          })
      } catch (error) {
          console.log(error);
      }

  }
}
export function orderBy (payload){
  return {

    type: "ORDER_ATTACK_POKE",
    payload
  }

}

export function orderByType (payload){
  return {
      type: "ORDER_BY_TYPE",
      payload

  }
}

export function getPokeType (){
  return async(dispatch) => {
    try {
      let pokeType = await axios('http://localhost:3001/types');
      return dispatch ({
          type: "GET_TYPES",
          payload: pokeType.data
      })
    } catch (error) {
      
    }
  }
}
// checking // done 26/8
 export function getName(name){
  return async(dispatch) => {
    try {
      const pokNam = await axios.get("http://localhost:3001/pokemons?name=" + name) 
       

      return dispatch ({
        type: "GET_NAME",
        payload: pokNam.data
      })
    } catch (error) {
         /* console.log(error)
         return dispatch({
          type: "GET_NAME",
          payload: ['Pokemon']
         }) */ 
         alert('nombre Completo')   
    }
  }
}

export function getType(name){
  return async(dispatch) => {
    try {
      const pokNam = await axios.get("http://localhost:3001/pokemons?type=" + name) 
       

      return dispatch ({
        type: "GET_TYPE",
        payload: pokNam.data
      })
    } catch (error) {
         /* console.log(error)
         return dispatch({
          type: "GET_NAME",
          payload: ['Pokemon']
         }) */ 
         alert('nombre Completo')   
    }
  }
}


//it works
export function getId(id){
 return async function (dispatch){
  try {
    const idPoke = await axios("http://localhost:3001/pokemons/" + id)
    return dispatch({
      type: "GET_ID", 
      payload: idPoke.data
    })

  } catch (error) {
    console.log(error)
  }
 }
}

//working
export function postPoke(payload){
  return async function(dispatch){
    //le paso un payload tambien a la ruta 
    const post = await axios.post("http://localhost:3001/pokemons", payload)
    return dispatch({
      type: "POST_POKEMON",
      payload: post
    })
  } 
}

//created in database
 export function filterDb(payload){

  return {
    type: "FILTER_DB",
    payload
  }
 }

 //this one works 
 export function restorePoke(payload){
    return {
      type: "RESTORE_POKE",
      payload
    }

 }