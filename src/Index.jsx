import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Index() {
  return (
    <div>
      <Navbar />
      <h1>Bienvenido a la Pastelería Mil Sabores</h1>
      <p>Explora nuestros deliciosos productos y disfruta de un mundo de sabores.</p>
      <Link className="nav-link" to="/">Inicio</Link>
    </div>
  );
}

export default Index;
