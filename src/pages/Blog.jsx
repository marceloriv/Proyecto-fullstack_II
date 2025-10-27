import React from 'react';
import '../App.css';

const Blog = () => {
    const recetas = [
        {
            id: "receta-red-velvet",
            imagen: "img/images1.jpeg",
            titulo: "Torta Red Velvet",
            descripcion: "Aprende a preparar una deliciosa Torta Red Velvet con esta receta fácil y rápida."
        },
        {
            id: "receta-chocolate-torta",
            imagen: "img/images2.jpeg",
            titulo: "Torta de Chocolate",
            descripcion: "Descubre cómo hacer una irresistible Torta de Chocolate con esta receta sencilla."
        },
        {
            id: "receta-tres-leches",
            imagen: "img/images3.jpeg",
            titulo: "Torta de Tres Leches",
            descripcion: "No te pierdas esta deliciosa Torta de Tres Leches, un postre clásico y esponjoso."
        },
        {
            id: "receta-frambuesa",
            imagen: "img/images4.jpeg",
            titulo: "Cupcake de Frambuesa",
            descripcion: "Deliciosos cupcakes con el sabor dulce y ligeramente ácido de las frambuesas frescas. Con un frosting cremoso decorado con frambuesas naturales."
        },
        {
            id: "receta-arandano",
            imagen: "img/images5.jpeg",
            titulo: "Cupcake de Arándano",
            descripcion: "Exquisitos cupcakes repletos de jugosos arándanos que explotan de sabor en cada bocado. Un frosting suave corona estos deliciosos postres antioxidantes."
        },
        {
            id: "receta-oreo",
            imagen: "img/images6.jpeg",
            titulo: "Cupcake de Oreo",
            descripcion: "Irresistibles cupcakes de chocolate con trozos de galletas Oreo incorporados en la masa. Coronados con un cremoso frosting y más galletas Oreo trituradas."
        }
    ];

    return (
        <>
            <div className="tituloBlog text-center mb-3 mt-4">
                <h1>Blog del Rincón Dulce</h1>
                <h2>Tortas</h2>
            </div>
            
            <div className="container to mb-5">
                <div className="container text-center ">
                    <div className="row align-items-start">
                        {recetas.slice(0, 3).map((receta) => (
                            <div key={receta.id} className="col-md-4 col-sm-6 mb-4">
                                <div className="card pastel product-card h-100" id={receta.id}>
                                    <img src={receta.imagen} className="card-img-top product-img" alt={receta.titulo} />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{receta.titulo}</h5>
                                        <p className="card-text">{receta.descripcion}</p>
                                        <button className="btn btn-primary mt-auto">Ver receta</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container tortas2 mb-5">
                <div className="container text-center">
                    <div className="row align-items-start">
                        {recetas.slice(3, 6).map((receta) => (
                            <div key={receta.id} className="col-md-4 col-sm-6 mb-4">
                                <div className="card pastel product-card h-100" id={receta.id}>
                                    <img src={receta.imagen} className="card-img-top product-img" alt={receta.titulo} />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{receta.titulo}</h5>
                                        <p className="card-text">{receta.descripcion}</p>
                                        <button className="btn btn-primary mt-auto">Ver receta</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Blog;