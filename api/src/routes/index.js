const { Router } = require("express");
// Importar todos los routers;
const axios = require("axios");
const { getApi, Dbdata, TodoPokemoncitos } = require("./PokemonGet");
// Ejemplo: const authRouter = require('./auth.js');
const { Op } = require("sequelize"); // en caso de llegar a necesitar los operadores de sequelize
const { Pokemon, Types } = require("../db");

const router = Router();

// Configurar los routers
// acá conseguimos todos los poke y tambien funciona si queremos buscar por el nombre de alguno, por ejemplo http://localhost:3001/pokemons?name=clefairy devuelve los datos del pokemon 35 clefairy
let pokesMagicos = []

router.get("/", (req, res) => {
  res.status(200).send("API is running");
});

router.get("/pokemons", async (req, res) => {
  try {
    const { name } = req.query;
    if (!pokesMagicos.length) {

      const allPoke = await getApi();
      /* console.log(allPoke) */
      pokesMagicos = [...allPoke]
    }


    const apiYDb = await TodoPokemoncitos(pokesMagicos)
    if (name) {
      // el lowerCase es por si las personas que buscan escriben con minusculas

      const losPoke = apiYDb.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );

      losPoke.length
        ? res.status(200).send(losPoke)
        : res.status(404).send("no hay poke");
    } else {
      //cambie el json ---trace back if something breaks
      res.status(200).send(apiYDb);
    }

    // res.status(200).json({allPoke})
  } catch (error) {
    console.log(error);
  }
});

// in any event, I added /pokemons/types instead of pokemons/types. It works
/* router.get('/pokemons/types', async (req, res) => {
  const {name} = req.query 
  const pokeApiType = await axios.get("https://pokeapi.co/api/v2/type");
  const losTipo = await pokeApiType.data.results.map((el) => el.name);

  losTipo.forEach((element) => {
    Types.findOrCreate({
      where: { name: element },
    });
  });
  const TodosTipoPoke = await Types.findAll();
  res.send(TodosTipoPoke);

  //para nombre de tipo 

  if (name) {
    // el lowerCase es por si las personas que buscan escriben con minusculas
      console.log(pokeApiType);
    const losPoke =  pokeApiType.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );

    losPoke.length
      ? res.status(200).send(losPoke)
      : res.status(404).send("no hay tipo");
  } else {
    //cambie el json ---trace back if something breaks
    res.status(200).send(pokeApiType);
  }


}) */
/* router.get('/pokemons/types', async (req, res) => {
  const { name, types } = req.query;
  const pokeApiType = await axios.get("https://pokeapi.co/api/v2/type");
  const losTipo = await pokeApiType.data.results.map((el) => el.name);

  losTipo.forEach((element) => {
    Types.findOrCreate({
      where: { name: element },
    });
  });
  const TodosTipoPoke = await Types.findAll();

  //para nombre de tipo 
  if (types) {
    // el lowerCase es por si las personas que buscan escriben con minusculas
    const filteredTypes = TodosTipoPoke.filter((type) =>
      type.name.toLowerCase().includes(types.toLowerCase())
    );

    filteredTypes.length
      ? res.status(200).send(filteredTypes)
      : res.status(404).send("no existe ese tipo");
  } else {
    // Send all types if no type name is provided
    res.status(200).send(TodosTipoPoke.map((type) => ({ name: type.name })));
  }
});
 */

router.get("/pokemons/types", async (req, res) => {
  const { name } = req.query;

  try {
    const pokemons = await TodoPokemoncitos(pokesMagicos);

    if (!name) {
      // If 'name' parameter is not provided, return all Pokémon types
      const allTypes = pokemons.reduce((types, pokemon) => {
        types.push(...pokemon.types.map((type) => type.name));
        return types;
      }, []);

      const uniqueTypes = Array.from(new Set(allTypes));

      res.status(200).send(uniqueTypes);
    } else {
      // If 'name' parameter is provided, filter Pokémon types by name
      const filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.types.some(
          (type) => type.name && type.name.toLowerCase() === name.toLowerCase()
        )
      );

      res.status(200).send(filteredPokemons);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching Pokémon types");
  }
});
router.get("/pokemons/:id", async (req, res) => {
  const { id } = req.params;
  const pokeTotal = await TodoPokemoncitos(pokesMagicos);
  if (id) {
    let pokeId = await pokeTotal.filter((el) => el.id == id); //filtramos para que nos de el id que necesitamos
    pokeId.length
      ? res.status(200).json(pokeId)
      : res.status(404).send("No hay Pokemoncitos");
  }
});
/* 
router.get('/types', async (req,res)=>{
try {
    await pokeDbTipo();
    let definitiveType = await tipoDePoke();

    definitiveType = definitiveType.map((g)=> {
        return g.name
    })
    res.send(definitiveType);

} catch (error) {
    console.log(error)
}


}) */
// route for evolution handling
/* router.get("/pokemons/:id/evolution", async (req, res) => {
  const { id } = req.params;
  try {
    const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
    const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
    const evolutionChainId = evolutionChainUrl.split('/').slice(-2, -1)[0];
    
    const evolutionChainResponse = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${evolutionChainId}/`);
    const evolutionChainData = evolutionChainResponse.data;
    
    res.status(200).json(evolutionChainData);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching evolution chain data");
  }
}); */

router.get("/pokemons/:id/evolution", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
    const evolutionChainUril = response.data.evolution_chain.url;
    const evolutionChainResponse = await axios.get(evolutionChainUril);
    const evolutionChainData = evolutionChainResponse.data;

    res.status(200).json(evolutionChainData)
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching evolution chain data")
  }
})


router.get("/types", async (req, res) => {
  const pokeApiType = await axios.get("https://pokeapi.co/api/v2/type");
  const losTipo = await pokeApiType.data.results.map((el) => el.name);

  losTipo.forEach((element) => {
    Types.findOrCreate({
      where: { name: element },
    });
  });
  const TodosTipoPoke = await Types.findAll();
  res.send(TodosTipoPoke);
});



//
router.post("/pokemons", async (req, res) => {
  const {
    name,
    id,
    life,
    defense,
    attack,
    speed,
    height,
    weight,
    img,
    createdInDb,
    //24/8 JUST IN CASE
    types,
  } = req.body;
  const miPoke = await Pokemon.create({
    name,
    id,
    life,
    attack,
    defense,
    speed,
    height,
    weight,
    img,
    createdInDb,
  });
  /* console.log(types) */
  const tipoBd1 = await Types.findAll({
    where: { name: types[0] },
  });

  miPoke.addTypes(tipoBd1);
  if (types[1]) {
    const tipoBd2 = await Types.findAll({
      where: { name: types[1] },
    });
    miPoke.addTypes(tipoBd2);
  }

  res.send("Poke bien creado");
});



// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
