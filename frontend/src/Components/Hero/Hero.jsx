import React from "react";
import "./Hero.css";
import chinnu1 from '../Assets/chinnu1.jpg';

const Hero = () => {
  return (
    <div className="hero">
        <div>
          <img src={chinnu1} alt="Exclusive Offers" />
          <p className="legend">Exclusive Offers</p>
        </div>
    </div>
  );
};

export default Hero;