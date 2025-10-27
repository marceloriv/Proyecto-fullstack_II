import '../App.css';

const About = () => {
    const valores = [
        { icono: '❤️', titulo: 'Pasión', descripcion: 'Amor por la repostería que se refleja en cada uno de nuestros productos.' },
        { icono: '🌱', titulo: 'Tradición', descripcion: 'Respeto por las recetas ancestrales que han endulzado generaciones.' },
        { icono: '✨', titulo: 'Calidad', descripcion: 'Utilizamos solo los mejores ingredientes en cada una de nuestras preparaciones.' },
        { icono: '🤝', titulo: 'Comunidad', descripcion: 'Creemos en crecer junto a nuestra comunidad y apoyar a nuevos talentos.' }
    ];

    return (
        <>
            <section className="about-header py-5">
                <div className="container text-center">
                    <h1>Nuestra Historia</h1>
                    <p>50 años endulzando momentos especiales</p>
                </div>
            </section>

            <section className="about-content py-5">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-md-6">
                            <h2 className="mb-4">Nuestra Trayectoria</h2>
                            <p>Pastelería Mil Sabores nació en 1973 cuando la familia González decidió compartir sus recetas tradicionales con la comunidad. Lo que comenzó como un pequeño local familiar en el barrio Yungay de Santiago, pronto se convirtió en un referente de la repostería chilena.</p>
                            <p>Nuestro momento más memorable fue en 1995, cuando participamos en la creación de la torta más grande del mundo, estableciendo un Récord Guinness. Esta hazaña nos dio reconocimiento internacional y consolidó nuestro compromiso con la calidad y la innovación.</p>
                            <p>Hoy, después de 50 años, mantenemos vivo el legado de nuestras recetas originales mientras incorporamos nuevas técnicas y sabores, siempre con el mismo amor y dedicación que nos caracteriza.</p>
                        </div>
                        <div className="col-md-6">
                            <img src="img/imagesHistoria.jpeg" alt="Historia de Pastelería Mil Sabores" className="img-fluid rounded shadow" />
                        </div>
                    </div>

                    <div className="row mb-5">
                        <div className="col-12 text-center mb-4">
                            <h2>Misión y Visión</h2>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="card h-100">
                                <div className="card-body text-center">
                                    <h3 className="card-title">Misión</h3>
                                    <p className="card-text">Ofrecer una experiencia dulce y memorable a nuestros clientes, proporcionando tortas y productos de repostería de alta calidad para todas las ocasiones, mientras celebramos nuestras raíces históricas y fomentamos la creatividad en la repostería.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="card h-100">
                                <div className="card-body text-center">
                                    <h3 className="card-title">Visión</h3>
                                    <p className="card-text">Convertirnos en la tienda online líder de productos de repostería en Chile, conocida por nuestra innovación, calidad y el impacto positivo en la comunidad, especialmente en la formación de nuevos talentos en gastronomía.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-5">
                        <div className="col-12 text-center mb-4">
                            <h2>Nuestros Valores</h2>
                        </div>
                        {valores.map((valor, index) => (
                            <div key={index} className="col-md-3 col-sm-6 mb-4">
                                <div className="card h-100 text-center">
                                    <div className="card-body">
                                        <div className="value-icon mb-3">{valor.icono}</div>
                                        <h5>{valor.titulo}</h5>
                                        <p>{valor.descripcion}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;