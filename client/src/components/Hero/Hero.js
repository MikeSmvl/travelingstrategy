import * as React from 'react';
import './Hero.css';
import video from '../../assets/video.mp4'
import Typed from 'react-typed';

const Hero = (props) => {
return(
  <div>
    <header>
      <video playsInline autoPlay loop muted className="wrapper__video">
        <source src={video} />
      </video>
      <div className="container">
        <Typed className="homeTyped"
          strings={['Welcome to', 'Bienvenue à', 'Bienvenidos a', 'Bem-vindo ao', 'Välkommen till', 'Benvenuto a']}
          typeSpeed={80}
          backSpeed={80}
          loop
        />
        <span className="homeTitle">Traveling Strategy</span>
        <h2 className="homeSubtitle">Fill out the form below to find all the information you will need before your travels</h2>
      </div>
    </header>
  </div>
)
};

export default Hero;