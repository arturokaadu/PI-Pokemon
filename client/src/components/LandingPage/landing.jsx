import React from "react";
import { Link } from "react-router-dom";
import styles from './landing.module.css' ;
export default function LandingPage() {
  return (
      <div className={styles.wrapper}>
    <div className={styles.landing}>
      
      <h1>Henry PokeApp</h1>
      <Link to="/home">
        <button className='btn-all'>Ingresar</button>
      </Link>
      </div>
    </div>
  );
}
