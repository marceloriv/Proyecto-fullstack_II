import React from 'react';
import { productos } from '../db/productos.js';


import ProductCard from './ProductCard.jsx';




export  function ProductList({ min, max, category }) {




  // Usando los productos importados directamente

  /*const data = async () => {
    try{
    const response = await fetch("http://demo1189936.mockable.io/api/v1/productos")

    if(!response.ok){
      throw Error("Error en la llamada a la API")
    }

    const productos = await response.json();
    return productos;
  }catch(error){
    console.error("Error fetching data:", error);
    return {productos: []};
  }}


  const resultados =  data();
  const products = resultados.productos;*/
  


  




  return (
    <>
      <div className="container">
        <h2>Productos</h2>
        <div className="row">
          {/* itera sobre la lista de productos y renderiza un ProductCard para cada uno */}
          {productos.map((producto) => {
            if(producto.price >= min && producto.price <= max){
              if (category === "Todos" || producto.category === category){
                return (
                  <div className="col-md-3" key={producto.id}>
                    <ProductCard product={producto} />
                  </div>
                );
              }
            }
          }
        )
      }
        </div>
      </div>
    </>

    
  );


  
}



