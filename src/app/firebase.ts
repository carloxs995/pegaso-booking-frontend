import { initializeApp } from 'firebase/app';

// Configurazione del progetto Firebase (dalla console Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyA0ywro3BVGX3IWzAtmUaQJmHDOZWHBRKI",
  projectId: "pegaso-booking",
  appId: "37310084387"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);

export default app;
