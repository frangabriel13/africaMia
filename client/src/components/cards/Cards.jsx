import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions/productActions';
import ReactPaginate from 'react-paginate';
import Card from '../card/Card';
import s from './Cards.module.css';

export default function Cards() {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  // Configuración de paginación
  const itemsPerPage = 16; // Cantidad de productos por página
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Función para manejar el cambio de página
  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  // Calcular los índices de inicio y fin de la página actual
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filtrar los productos para mostrar solo los de la página actual
  const productsToDisplay = products.slice(startIndex, endIndex);

  return (
   <div className={s.containerGlobal}> 
    <div className={s.container}>
      {productsToDisplay.map((c) => (
        <Card
          name={c.name}
          price={c.price}
          id={c.id}
          images={c.images[0]?.url || ''}
          key={c.id}
          productId={c.id}
          onSelectProduct={handleProductSelect}
        />
       ))}
    
       <ReactPaginate
        pageCount={Math.ceil(products.length / itemsPerPage)} // Calcular la cantidad de páginas
        pageRangeDisplayed={5} // Cantidad de números de página mostrados en la paginación
        marginPagesDisplayed={1} // Cantidad de páginas en los bordes de la paginación
        onPageChange={handlePageChange}
        containerClassName={s.pagination}
        activeClassName={s.activePage}
       />
    </div>
   </div>
   
  );
}
