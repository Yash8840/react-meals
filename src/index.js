import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Snowfall from 'react-snowfall';
import { Fragment } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import ParticleComp from './Components/UI/ParticleComp';

const root = ReactDOM.createRoot(document.getElementById('root'));
  // const particlesInit = async (main) =>{
  //   await loadFull(main)
  // }

root.render(<Fragment><ParticleComp/><Snowfall snowflakeCount={300} style={{
  position: 'fixed',
  width: '100vw',
  height: '100vh',
}}/><App /></Fragment>);

// for Snowfall:
// root.render(<Fragment><Snowfall snowflakeCount={300}/><App /></Fragment>);
