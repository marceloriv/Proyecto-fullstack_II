import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CarritoProvider } from "./Contexts/CarritoContext.jsx";
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'; // Inicio

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </AuthProvider>
  </StrictMode>
);

