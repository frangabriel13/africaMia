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
        {productsToDisplay.map((product) => (
          <Card
            key={product.id}
            name={product.name}
            price={product.price}
            id={product.id}
            images={product.images[0]?.url || ''}
            productId={product.id}
            onSelectProduct={handleProductSelect}
          />
        ))}
      </div>
      
      <div className={s.paginationContainer}>
        <ReactPaginate
          pageCount={Math.ceil(products.length / itemsPerPage)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          containerClassName={s.pagination}
          activeClassName={s.activePage}
        />
      </div>
    </div>
  );
  
}
