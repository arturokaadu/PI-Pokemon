//importamos las action types

const initialState = {
  //pokemons was {}
  pokemons: [],
  allPokemons: [],
  types: [],
  //para ids
  details: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "ORDER_BY_TYPE":
      const allPokemones = state.allPokemons;
      const statusFiltered =
        action.payload === "All"
          ? allPokemones
          : allPokemones.filter((el) => el.types.map(typ => typ.name).includes(action.payload));

      return {
        ...state,
        pokemons: statusFiltered 
      };
    //Its working
    case "GET_NAME":
      return {
        ...state,
        pokemons: action.payload,
      };
    //check this later too
    case "GET_ID":
      return {
        ...state,
        // iba a ponerle id pero por las dudas algo ya se llame id y crashee
        details: action.payload,
      };
    //check this as well
    case "POST_POKEMON":
      return {
        ...state,
      };
    //check this
    case "FILTER_DB":
       const allPokesRevenge = state.allPokemons;
      /*  console.log(action.payload); */
      const filter2 =
        action.payload === "Created"
          ? allPokesRevenge.filter((ele) => ele.createdInDb)
          : allPokesRevenge.filter((ele) => !ele.createdInDb);
      return {
        ...state,
        pokemons:
          action.payload === "All"
            ? allPokesRevenge
            : filter2.length
            ? filter2
            : [],
      }; 
     
      case "RESTORE_POKE":
        return{
            ...state,
            details: []
        }
    case "GET_POKEMON":
      //             console.log(state.pokemons);
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    //arr.sort
    case "ORDER_ATTACK_POKE":
      let orderPoke;
      // numbers mean positions
      // 0 means they're equal
      // we compare values --
      switch (action.payload) {
        case "mayor":
          state.pokemons.sort(function (a, b) {
            if (a.attack > b.attack) {
              return -1;
            }
            if (b.attack > a.attack) {
              return 1;
            }
            return 0;
          });

          break;
        case "menor":
          state.pokemons.sort(function (a, b) {
            if (a.attack > b.attack) {
              return 1;
            }
            if (b.attack > a.attack) {
              return -1;
            }
            return 0;
          });

          break;

        case "ascendente":
          state.pokemons.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (b.name > a.name) {
              return -1;
            }
            return 0;
          });

          break;
        case "descendente":
          state.pokemons.sort(function (a, b) {
            if (a.name < b.name) {
              return 1;
            }
            if (b.name < a.name) {
              return -1;
            }
            return 0;
          });
          break;

        default:
          break;
      }

    default:
      return state;
  }
}

export default rootReducer;
