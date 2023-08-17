import React, { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";
import styles from './evolution.module.css'; 
const Evolution = ({ evolution }) => {
  const [currentPokemon, setCurrentPokemon] = useState(evolution.chain.species.name);
  const hasPreviousEvolution = !!evolution.chain.evolves_to[0]?.species.name;
  const hasNextEvolution =
    !!evolution.chain.evolves_to[0]?.evolves_to[0]?.species.name ||
    !!evolution.chain.evolves_to[0]?.species.name;

  const handlePrevious = () => {
    if (currentPokemon === evolution.chain.species.name) {
      setCurrentPokemon(
        evolution.chain.evolves_to[0]?.evolves_to[0]?.species.name ||
        evolution.chain.evolves_to[0]?.species.name
      );
    } else if (currentPokemon === evolution.chain.evolves_to[0]?.species.name) {
      setCurrentPokemon(evolution.chain.species.name);
    } else {
      setCurrentPokemon(evolution.chain.evolves_to[0]?.species.name);
    }
  };

  const handleNext = () => {
    if (currentPokemon === evolution.chain.species.name) {
      setCurrentPokemon(evolution.chain.evolves_to[0]?.species.name);
    } else if (currentPokemon === evolution.chain.evolves_to[0]?.species.name) {
      setCurrentPokemon(
        evolution.chain.evolves_to[0]?.evolves_to[0]?.species.name ||
        evolution.chain.species.name
      );
    } else {
      setCurrentPokemon(evolution.chain.evolves_to[0]?.species.name);
    }
  };
  const [currentPokemonImageUrl, setCurrentPokemonImageUrl] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${currentPokemon}`);
      //console.log("Response data:", response.data); // Log the response data
      const imageUrl = response.data.sprites.front_default; // Access the sprite image URL
      setCurrentPokemonImageUrl(imageUrl);
    } catch (error) {
      //console.error("Error fetching Pokemon data:", error);
    }
  };

  fetchData();

  return (
    <div>
      <h3 className={styles.chainName}>Evolution chain:</h3>
      <span className={styles.chainName}>{currentPokemon}</span>
      <div className={styles.imageContainer}>
      {currentPokemonImageUrl && <img className={styles.pokemonEvolutionChain} src={currentPokemonImageUrl} alt={currentPokemon} />}
      </div>
      {hasPreviousEvolution && (
        <button 
        className={styles.botonesEvo}
          onClick={handlePrevious}
          disabled={currentPokemon === evolution.chain.species.name}
        >
          Previous
        </button>
      )}
      {hasNextEvolution && (
        <button
        className={styles.botonesEvo}
          onClick={handleNext}
          disabled={
            currentPokemon ===
            (evolution.chain.evolves_to[0]?.evolves_to[0]?.species.name ||
              evolution.chain.evolves_to[0]?.species.name)
          }
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Evolution;
