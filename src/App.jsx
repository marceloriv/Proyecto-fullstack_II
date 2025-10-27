import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Contacto from "./pages/Contacto";
import Login from './pages/login.jsx';
import Productos from './pages/Productos.jsx';
import Navbar from './components/Navbar.jsx';
import Registro from "./pages/registro.jsx";
import { ContextoFiltros } from "./Contexts/ContextoFiltros.jsx";
import { AuthProvider } from '../src/contexts/AuthContext';
import DetalleDeProducto from "./pages/detalleDeProducto.jsx";
import Carrito from "./pages/Carrito.jsx";

function App(){
  return(
    <AuthProvider>
      <ContextoFiltros>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/carrito" element={<Carrito />} /> 
            <Route path="/detalle_producto/:id" element={<DetalleDeProducto />} />

          </Routes>
        </BrowserRouter>
      </ContextoFiltros>
    </AuthProvider>
    
  )
}

export default App;