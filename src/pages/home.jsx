import React, { useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { FiltrosContext } from '../Contexts/ContextoFiltros.jsx';



function Home() {
    const { setCategory } = useContext(FiltrosContext);
    const navegador = useNavigate();

    const botonIndividuales = () =>{
        setCategory("Postres Individuales");
        navegador("/productos");
    }


    const botonTradicional = () =>{
        setCategory("Tortas Tradicionales");
        navegador("/productos");
    }

    const botonEspeciales = () =>{
        setCategory("Tortas Especiales");
        navegador("/productos");
    }

    const botoncirculares = () =>{
        setCategory("Tortas Circulares");
        navegador("/productos");
    }

    const bontonCuadradas = () =>{
        setCategory("Tortas Cuadradas");
        navegador("/productos");
    }   



  return (
    <>
      <section className="hero-section">
        <div className="container">
            <div className="row align-items-center min-vh-100">
                <div className="col-md-6">
                    <h1 className="hero-title">Celebra la dulzura de la vida</h1>
                    <p className="hero-subtitle">50 años endulzando tus momentos especiales con las mejores tortas y postres tradicionales</p>
                    <Link to="/productos" className="btn btn-primary hero-btn">Ver Productos</Link>
                </div>
                <div className="col-md-6 text-center">
                    <img src="img/images14.jpeg" alt="Torta de celebración" className="img-fluid hero-image" />
                </div>
            </div>
        </div>
    </section>

    
    <section className="categories-section py-5">
        <div className="container">
            <h2 className="section-title text-center mb-5">Nuestras Categorías</h2>
            <div className="row">
                <div className="col-md-3 col-sm-6 mb-4">
                    <div className="category-card text-center h-100">
                        <div className="category-icon">
                            <img src="img/images16.jpeg" alt="Tortas Circulares" className="card-img-top product-img" />
                        </div>
                        <h3>Tortas circulares</h3>
                        <p>Cuadradas, circulares y especiales para toda ocasión</p>
                        <button onClick={botoncirculares} className="btn btn-sm btn-outline-primary">Ver más</button>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-4">
                    <div className="category-card text-center h-100">
                        <div className="category-icon">
                            <img src="img/images11.jpeg" alt="Postres Individuales" className="card-img-top product-img" />
                        </div>
                        <h3>Postres Individuales</h3>
                        <p>Deliciosos postres para disfrutar en porciones individuales</p>
                        <button onClick={botonIndividuales} className="btn btn-sm btn-outline-primary">Ver más</button>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-4">
                    <div className="category-card text-center h-100">
                        <div className="category-icon">
                            <img src="img/images14.jpeg" alt="Tortas Especiales" className="card-img-top product-img"/>
                        </div>
                        <h3>Tortas Especiales</h3>
                        <p>Opciones sin azúcar, sin gluten y veganas</p>
                        <button onClick={botonEspeciales} className="btn btn-sm btn-outline-primary">Ver más</button>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-4">
                    <div className="category-card text-center h-100">
                        <div className="category-icon">
                            <img src="img/images5.jpeg" alt="Tortas Tradicionales" className="card-img-top product-img"/>
                        </div>
                        <h3>Tortas Tradicionales</h3>
                        <p>Recetas clásicas que han endulzado generaciones</p>
                        <button onClick={botonTradicional} className="btn btn-sm btn-outline-primary">Ver más</button>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-4">
                    <div className="category-card text-center h-100">
                        <div className="category-icon">
                            <img src="img/images10.jpeg" alt="Tortas Cuadradas" className="card-img-top product-img"/>
                        </div>
                        <h3>Tortas Cuadradas</h3>
                        <p>Recetas cuadradas para toda la familia</p>
                        <button onClick={bontonCuadradas} className="btn btn-sm btn-outline-primary">Ver más</button>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <section className="products-section py-5 bg-light">
        <div className="container">
            <h2 className="section-title text-center mb-5">Productos Destacados</h2>
            <div className="row" id="featured-products">

            </div>
            <div className="text-center mt-4">
                <Link to="/productos" className="btn btn-outline-primary">Ver Todos los Productos</Link>
            </div>
        </div>
    </section>

    
    <section className="about-preview-section py-5">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <img src="img/imagesHistoria.jpeg" alt="Nuestra historia" className="img-fluid rounded shadow"/>
                </div>
                <div className="col-md-6">
                    <h2 className="section-title">50 años de tradición dulce</h2>
                    <p>Pastelería Mil Sabores nació en 1973 cuando la familia González decidió compartir sus recetas tradicionales con la comunidad. Lo que comenzó como un pequeño local familiar, pronto se convirtió en un referente de la repostería chilena.</p>
                    <p>Nuestro momento más memorable fue en 1995, cuando participamos en la creación de la torta más grande del mundo, estableciendo un Récord Guinness.</p>
                    <Link to="/nosotros" className="btn btn-primary">Conoce Nuestra Historia</Link>
                </div>
            </div>
        </div>
    </section>


    <footer className="footer py-5">
        <div className="container">
            <div className="row">
                <div className="col-md-4 mb-4">
                    <h4>Pastelería Mil Sabores</h4>
                    <p>50 años endulzando momentos especiales con las mejores recetas tradicionales y modernas de la repostería chilena.</p>
                    <div className="social-links">
                        <a href="#" className="social-link">Facebook</a>
                        <a href="#" className="social-link">Instagram</a>
                        <a href="#" className="social-link">Twitter</a>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <h4>Enlaces Rápidos</h4>
                    <ul className="footer-links">
                        <li><Link to="/Home">Inicio</Link></li>
                        <li><Link to="/productos">Productos</Link></li>
                        <li><Link to="/nosotros">Nosotros</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                    </ul>
                </div>
                <div className="col-md-4 mb-4">
                    <h4>Contacto</h4>
                    <p>Av. Dulce 1234, Santiago Centro<br/>
                    Región Metropolitana, Chile</p>
                    <p>Teléfono: +56 2 2345 6789<br/>
                    Email: info@pasteleriamilsabores.cl</p>
                </div>
            </div>
            <div className="row">
                <div className="col-12 text-center">
                    <p className="copyright">&copy; 2025 Pastelería Mil Sabores. Todos los derechos reservados.</p>
                </div>
            </div>
        </div>
    </footer>
    </>
  )
}

export default Home;


