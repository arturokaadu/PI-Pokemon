const axios = require("axios");

const { Pokemon, Types } = require("../db");

//traigo a este archivo la llamada a todos los poke de la api para reducir la longitud
// acá conseguimos los datos necesarios de los pokemons desde la api
const getApi = async () => {
  try {
    // usamos async await para trabajar de manera asincrona, para que espere a que se termine un proceso primero
    const apiUrl = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=151"
    ); //establecemos un limite para los pokemones que traemos

    const pokeDatita = await apiUrl.data.results.map((poke) => {
      return poke.url;
    }); //hacemos la consulta a la url que hay dentro de la primera url

    const axios4TheWin = [];

    for (let i = 0; i < pokeDatita.length; i++) {
      const urls = await axios(pokeDatita[i]);
      axios4TheWin.push({
        id: urls.data.id,
        name: urls.data.name,
        img: urls.data.sprites.other.dream_world.front_default ? urls.data.sprites.other.dream_world.front_default : urls.data.sprites.front_default,
        height: urls.data.height,
        weight: urls.data.weight,
        types: urls.data.types.map(e => {

          return {
            name: e.type.name
          }
        }), //map para que devuelva todos de todos

        life: urls.data.stats[0].base_stat,
        attack: urls.data.stats[1].base_stat,
        defense: urls.data.stats[2].base_stat,
        speed: urls.data.stats[5].base_stat,

      });
    };
    return axios4TheWin;


  } catch (error) {
    console.log(error);
  }

};

// a continuacion conseguimos los datos de la db con un findall de sequelize

const Dbdata = async () => {
  let dbPokemoncito = await Pokemon.findAll({
    include: {
      // le indicamos que queremos el nombre del modelo tipo creado en models
      model: Types,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return dbPokemoncito;
};

// concatenamos los dos tipos de data traida, la de la api y la de db
//spread operator
//ejecutamos las funciones porque sino no traeria nada
const TodoPokemoncitos = async (pok2) => {
  try {
    //const api = await getApi();
    const db = await Dbdata();
    const todos = [...pok2, ...db];
    return todos;
  } catch (error) {
    console.log(error);
    return error;
  }
};


module.exports = {
  getApi,
  Dbdata,
  TodoPokemoncitos,

};
