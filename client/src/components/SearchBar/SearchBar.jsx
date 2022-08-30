import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getName } from "../../actions";
import styles from "./search.module.css";
import logo from "../../assets/icons8-search.svg";
export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name) {
      dispatch(getName(name));
    }
    setName("");
  }

  return (
    <div>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Busca Pokemons"
        value={name}
        onChange={(e) => {
          handleInputChange(e);
        }}
      />
      <button
        className={styles.lupita}
        type="submit"
        value={name}
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        <img className={styles.imgLupa} src={logo} />
      </button>
    </div>
  );
}
