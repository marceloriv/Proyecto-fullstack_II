import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../App.css';

const Blog = () => {
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleOpenRecipe = (receta) => {
        setSelectedRecipe(receta);
        setShowModal(true);
    };

    const handleCloseRecipe = () => {
        setSelectedRecipe(null);
        setShowModal(false);
    };

    const recetas = [
        {
            id: "receta-red-velvet",
            imagen: "/img/images1.jpeg",
            titulo: "Torta Red Velvet",
            descripcion: "Aprende a preparar una deliciosa Torta Red Velvet con esta receta fácil y rápida.",
            ingredientes: [
                "2 1/2 tazas de harina de trigo",
                "1 1/2 tazas de azúcar",
                "1 cucharadita de bicarbonato de sodio",
                "1 cucharadita de cacao en polvo",
                "1 taza de buttermilk (suero de leche)",
                "2 huevos grandes",
                "1 1/2 tazas de aceite vegetal",
                "1 cucharadita de vinagre blanco",
                "Colorante rojo para alimentos"
            ],
            instrucciones: [
                "Precalienta el horno a 180°C y engrasa dos moldes circulares.",
                "En un bol grande, tamiza los ingredientes secos: harina, azúcar, bicarbonato y cacao.",
                "En otro bol, mezcla los ingredientes húmedos: aceite, buttermilk, huevos, vinagre y el colorante rojo.",
                "Incorpora los ingredientes húmedos a los secos y mezcla hasta obtener una masa homogénea.",
                "Divide la masa entre los moldes y hornea por 25-30 minutos.",
                "Deja enfriar y decora con frosting de queso crema."
            ]
        },
        {
            id: "receta-chocolate-torta",
            imagen: "/img/images2.jpeg",
            titulo: "Torta de Chocolate",
            descripcion: "Descubre cómo hacer una irresistible Torta de Chocolate con esta receta sencilla.",
            ingredientes: [
                "2 tazas de harina",
                "2 tazas de azúcar",
                "3/4 taza de cacao en polvo",
                "2 cucharaditas de polvo de hornear",
                "2 huevos",
                "1 taza de leche",
                "1/2 taza de aceite",
                "1 taza de agua hirviendo"
            ],
            instrucciones: [
                "Mezcla todos los ingredientes secos en un tazón.",
                "Agrega los huevos, la leche y el aceite, y bate durante dos minutos a velocidad media.",
                "Incorpora el agua hirviendo (la masa quedará líquida, esto es normal).",
                "Hornea a 180°C durante 30-35 minutos.",
                "Deja enfriar y cubre con ganache de chocolate."
            ]
        },
        {
            id: "receta-tres-leches",
            imagen: "/img/images3.jpeg",
            titulo: "Torta de Tres Leches",
            descripcion: "No te pierdas esta deliciosa Torta de Tres Leches, un postre clásico y esponjoso.",
            ingredientes: [
                "1 taza de harina",
                "1 1/2 cucharaditas de polvo de hornear",
                "5 huevos",
                "1 taza de azúcar",
                "1/3 taza de leche entera",
                "1 lata de leche condensada",
                "1 lata de leche evaporada",
                "1 taza de crema de leche"
            ],
            instrucciones: [
                "Bate las claras de huevo a nieve y agrega el azúcar lentamente. Luego incorpora las yemas.",
                "Agrega la harina tamizada y la leche de forma alternada.",
                "Vierte en un molde y hornea a 180°C por 25 minutos.",
                "Mezcla las tres leches (condensada, evaporada y crema) y baña el bizcocho templado.",
                "Decora con merengue o crema chantillí y canela molida."
            ]
        },
        {
            id: "receta-frambuesa",
            imagen: "/img/images4.jpeg",
            titulo: "Cupcake de Frambuesa",
            descripcion: "Deliciosos cupcakes con el sabor dulce y ligeramente ácido de las frambuesas frescas. Con un frosting cremoso decorado con frambuesas naturales.",
            ingredientes: [
                "1 1/2 tazas de harina",
                "1 taza de azúcar",
                "1/2 taza de mantequilla a temperatura ambiente",
                "2 huevos",
                "1/2 taza de leche",
                "1 taza de frambuesas frescas"
            ],
            instrucciones: [
                "Bate la mantequilla con el azúcar hasta que quede cremosa.",
                "Agrega los huevos uno a uno, luego la leche alternando con la harina.",
                "Incorpora las frambuesas de forma envolvente.",
                "Coloca en moldes para cupcakes y hornea a 180°C por 20 minutos.",
                "Decora con crema de frambuesa una vez fríos."
            ]
        },
        {
            id: "receta-arandano",
            imagen: "/img/images5.jpeg",
            titulo: "Cupcake de Arándano",
            descripcion: "Exquisitos cupcakes repletos de jugosos arándanos que explotan de sabor en cada bocado. Un frosting suave corona estos deliciosos postres antioxidantes.",
            ingredientes: [
                "1 1/2 tazas de harina",
                "1 taza de azúcar",
                "1/2 taza de mantequilla",
                "2 huevos",
                "1/2 taza de leche",
                "1 taza de arándanos frescos"
            ],
            instrucciones: [
                "Bate la mantequilla y el azúcar. Añade los huevos uno a uno.",
                "Incorpora la leche y la harina alternadamente.",
                "Enharina ligeramente los arándanos y mézclalos suavemente en la masa.",
                "Vierte en los pirotines y hornea a 180°C por 18-20 minutos.",
                "Decora con crema suave y arándanos frescos encima."
            ]
        },
        {
            id: "receta-oreo",
            imagen: "/img/images6.jpeg",
            titulo: "Cupcake de Oreo",
            descripcion: "Irresistibles cupcakes de chocolate con trozos de galletas Oreo incorporados en la masa. Coronados con un cremoso frosting y más galletas Oreo trituradas.",
            ingredientes: [
                "1 1/2 tazas de harina",
                "1 taza de azúcar",
                "1/2 taza de cacao",
                "2 huevos",
                "1/2 taza de leche",
                "12 galletas Oreo trituradas"
            ],
            instrucciones: [
                "Mezcla la harina, azúcar y cacao. Incorpora los huevos y la leche batida.",
                "Agrega las galletas Oreo troceadas finamente.",
                "Vierte la mezcla en pirotines hasta 2/3 de su capacidad.",
                "Hornea a 180°C por 20 minutos.",
                "Decora con un frosting de crema de queso mezclado con polvo de Oreo y media galleta para decorar."
            ]
        }
    ];

    return (
        <div className="blog">
            <div className="blog-container">
                <h1>Blog del Rincón Dulce</h1>
                <p className="lead text-muted mb-5">Descubre nuestras mejores recetas, secretos de repostería y consejos para endulzar tu hogar.</p>
                
                <div className="blog-posts">
                    {recetas.map((receta) => (
                        <div key={receta.id} className="post mb-4 w-100" id={receta.id}>
                            <div className="row align-items-center">
                                <div className="col-md-5 mb-3 mb-md-0">
                                    <img 
                                        src={receta.imagen} 
                                        className="img-fluid rounded" 
                                        alt={receta.titulo} 
                                        style={{ width: '100%', height: '220px', objectFit: 'cover' }} 
                                    />
                                </div>
                                <div className="col-md-7">
                                    <h2>{receta.titulo}</h2>
                                    <p>{receta.descripcion}</p>
                                    <button 
                                        className="btn btn-primary"
                                        onClick={() => handleOpenRecipe(receta)}
                                    >
                                        Ver receta
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal para ver la Receta Completa */}
            <Modal show={showModal} onHide={handleCloseRecipe} size="lg" centered>
                {selectedRecipe && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>{selectedRecipe.titulo}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <img 
                                        src={selectedRecipe.imagen} 
                                        alt={selectedRecipe.titulo} 
                                        className="img-fluid rounded shadow-sm"
                                        style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="col-md-7">
                                    <h5>Descripción</h5>
                                    <p>{selectedRecipe.descripcion}</p>
                                    
                                    <h5 className="mt-4">Ingredientes</h5>
                                    <ul>
                                        {selectedRecipe.ingredientes.map((ing, idx) => (
                                            <li key={idx}>{ing}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <hr />
                            <div className="row mt-3">
                                <div className="col-12">
                                    <h5>Instrucciones de preparación</h5>
                                    <ol>
                                        {selectedRecipe.instrucciones.map((inst, idx) => (
                                            <li key={idx} className="mb-2">{inst}</li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseRecipe}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default Blog;