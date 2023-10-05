// Page1.tsx
import React from 'react';
import fondo from '../assets/fondosire.png'
import '../../css/imagenfondo.css'


const Home: React.FC = () => {
  return (
    <>
      <div className="container" >
        <div className="image-container">
          <img className="centered-image" src={fondo} alt="campeonato" />
        </div>
      </div>

    </>
  );
};

export default Home;