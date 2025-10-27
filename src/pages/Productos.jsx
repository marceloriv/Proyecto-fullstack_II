import { useState } from 'react';
import { ProductList } from '../components/ProductList.jsx';
import { useContext } from 'react';
import { FiltrosContext } from '../Contexts/ContextoFiltros.jsx';

// Lista de productos 


function Productos() {
  const { minPrice, maxPrice, category, setMinPrice, setMaxPrice, setCategory } = useContext(FiltrosContext);

  

  return (
    <div className='app-container'>
      <div className="filter-section">
        <label>
          Precio mínimo:
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
        </label>
        <label>
          Precio máximo:
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </label>
        <label>
          Categoría:
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value='Todos'>Todos</option>
            <option value='Tortas Circulares'>Tortas Circulares</option>
            <option value='Tortas Cuadradas'>Tortas Cuadradas</option>
            <option value='Postres Individuales'>Postres Individuales</option>
            <option value='Tortas Tradicionales'>Tortas Tradicionales</option>
            <option value='Tortas Especiales'>Tortas Especiales</option>
          </select>
        </label>
      </div>

    {/* <ProductList products={filtreredProducts} /> */}


      <ProductList min = {minPrice} max = {maxPrice} category = {category} />
      
      
    </div>
  );
}

export default Productos;
