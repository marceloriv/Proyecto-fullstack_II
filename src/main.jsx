import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CarritoProvider } from "./contexts/CarritoContext.jsx";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'; // Inicio


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CarritoProvider>
      <App />
    </CarritoProvider>
  </StrictMode>
);

