import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getName, getPokeType, getType, getId } from "../../actions";
import styles from "./search.module.css";
import logo from "../../assets/icons8-search.svg";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [id, setId] = useState("")
  const [searchInput, setSearchInput] = useState("")
  function handleNameChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    /* if (name === "name") {
      setName(value);
    } else if (name === "type") {
      setType(value);
    } */ 
    setSearchInput(e.target.value)
  }


  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  }
    // Helper function to check if the input is a type
    function isType(input) {
      const allTypes = [
       "normal",
       "ground",
       "rock",
        "flying",
        "fighting",
        "poison",
        "ghost",
        "bug",
        "steel",
        "fire",
        "grass",
        "water", 
        "electric",
        "psychic",
        "ice",
        "dragon",
        "fairy",
        "unknown",
        "shadow",
      
      ];
  
      return allTypes.includes(input);
    }
  

  function handleSubmit(e) {
    e.preventDefault();
    /* if (name) {
      dispatch(getName(name));
      setName("");
    } else if (type) {
      //console.log("Searching by type: ", type); 
      dispatch(getType(type));
      setType("");
    } */
    const input = searchInput.trim().toLowerCase();
    if (input) {
      if(isType(input)){
        dispatch(getType(input))
      } else {
        dispatch(getName(input))
      }
      setSearchInput("")
    }
    else if (id){
      dispatch(getId(id));
      setId("")
    }
  }

  function handleIdChange(e) {
    e.preventDefault();
    setId(e.target.value)
  }
  return (
    <div>
  {/*    <input
  className={styles.searchInput}
  type="text"
  name="name"
  placeholder="Search Pokemons by name"
  onKeyDown={handleKeyDown}
  value={name}
  onChange={handleNameChange}
/>

<input
  className={styles.searchInput}
  type="text"
  name="type"
  placeholder="Search Pokemons by type"
  onKeyDown={handleKeyDown}
  value={type}
  onChange={handleNameChange}
/> */}

<input  className={styles.searchInput}
        type="text"
        placeholder="Search Pokemons by name or type"
        onKeyDown={handleKeyDown}
        value={searchInput}
        onChange={handleNameChange}
/>
<input
className={styles.searchInputId}
type= "number"
name="id"
placeholder="Search by ID"
onKeyDown={handleKeyDown}
value={id}
onChange={handleIdChange}
></input>
      <button
        className={styles.lupita}
        type="submit"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        <img className={styles.imgLupa} src={logo} />
      </button>
    </div>
  );
}
