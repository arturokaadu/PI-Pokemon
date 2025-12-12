const axios = require("axios");

const { Pokemon, Types } = require("../db");

const fs = require("fs");
const path = require("path");

const CACHE_PATH = path.join(__dirname, "pokecache.json");

//traigo a este archivo la llamada a todos los poke de la api para reducir la longitud
// acá conseguimos los datos necesarios de los pokemons desde la api
const getApi = async () => {
  try {
    // Check for cache first
    if (fs.existsSync(CACHE_PATH)) {
      console.log("Loading Pokemons from local cache...");
      const cachedData = fs.readFileSync(CACHE_PATH, "utf-8");
      return JSON.parse(cachedData);
    }

    console.log("Cache not found. Fetching from API (this may take a while)...");

    // usamos async await para trabajar de manera asincrona, para que espere a que se termine un proceso primero
    const apiUrl = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=151"
    ); //establecemos un limite para los pokemones que traemos

    if (!apiUrl.data || !apiUrl.data.results) return [];

    const pokeDatita = apiUrl.data.results.map((poke) => {
      return poke.url;
    }); //hacemos la consulta a la url que hay dentro de la primera url

    const promises = pokeDatita.map((url) => axios.get(url));
    const responses = await Promise.all(promises);

    const axios4TheWin = responses.map((urls) => {
      return {
        id: urls.data.id,
        name: urls.data.name,
        img: urls.data.sprites.other.dream_world.front_default
          ? urls.data.sprites.other.dream_world.front_default
          : urls.data.sprites.front_default,
        height: urls.data.height,
        weight: urls.data.weight,
        types: urls.data.types.map((e) => {
          return {
            name: e.type.name,
          };
        }), //map para que devuelva todos de todos

        life: urls.data.stats[0].base_stat,
        attack: urls.data.stats[1].base_stat,
        defense: urls.data.stats[2].base_stat,
        speed: urls.data.stats[5].base_stat,
      };
    });

    // Save to cache
    try {
      fs.writeFileSync(CACHE_PATH, JSON.stringify(axios4TheWin));
      console.log("Pokemons saved to local cache.");
    } catch (writeError) {
      console.error("Failed to write to cache:", writeError);
    }

    return axios4TheWin;
  } catch (error) {
    console.error("Error in getApi:", error);
    return [];
  }
};

// a continuacion conseguimos los datos de la db con un findall de sequelize

const Dbdata = async () => {
  try {
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
  } catch (error) {
    console.error("Error in Dbdata:", error);
    return [];
  }
};

// concatenamos los dos tipos de data traida, la de la api y la de db
//spread operator
//ejecutamos las funciones porque sino no traeria nada
const TodoPokemoncitos = async (pok2) => {
  try {
    //const api = await getApi();
    const db = await Dbdata();
    // Ensure pok2 is an array
    const apiData = Array.isArray(pok2) ? pok2 : [];
    const todos = [...apiData, ...db];
    return todos;
  } catch (error) {
    console.error("Error in TodoPokemoncitos:", error);
    // Even if something fails here, try to return what we have or empty array
    return Array.isArray(pok2) ? pok2 : [];
  }
};

module.exports = {
  getApi,
  Dbdata,
  TodoPokemoncitos,
};
