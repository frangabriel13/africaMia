// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import Card from '../card/Card';
// import { filterProducts } from '../../redux/actions/productActions';
// import s from './ProductsByCategory.module.css';
// import Pagination from '../pagination/Pagination';

// const ProductsByCategory = () => {
//   const { categoryId } = useParams();
 
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.product.products);
//  console.log(products);
//   useEffect(() => {
//   dispatch(filterProducts(categoryId));
// }, [dispatch, categoryId]);
  
//   return (
//     <div className={s.productsContainer}>
//       <h2 className={s.categoryTitle}>Tienda</h2>
//       <div className={s.productList}>
//         {products.length > 0 ? (
//           products.map((product) => (
//             <Card
//               key={product.id}
//               name={product.name}
//               price={product.price}
//               id={product.id}
//               // images={product.images[0]?.url || ''}
//               imgMain={product.imgMain}
//               images={product.images}
//               productId={product.id}
//             />
//           ))
//         ) : (
//           <h1>No hay productos en esta Categoría</h1>
//         )}
//       </div>
//     </div>
//   );
  
// };

// export default ProductsByCategory;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../card/Card'; // Asegúrate de importar el componente Card
import { filterProducts } from '../../redux/actions/productActions'; // Importa la acción de filtro de productos
import s from './ProductsByCategory.module.css'; // Importa el archivo de estilos CSS
import Pagination from '../pagination/Pagination'; // Importa el componente de paginación

const ProductsByCategory = () => {
  const { categoryId } = useParams(); // Obtén el ID de la categoría desde los parámetros de la URL

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  console.log(products);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 25;

  useEffect(() => {
    // Siempre llama a filterProducts cuando el componente se monta
    dispatch(filterProducts(categoryId));
  }, [dispatch, categoryId]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfFirstProduct + productsPerPage);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={s.productsContainer}>
      <h2 className={s.categoryTitle}>Tienda</h2>
      <div className={s.productList}>
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <Card
              key={product.id}
              name={product.name}
              price={product.price}
              id={product.id}
              imgMain={product.imgMain}
              images={product.images}
              productId={product.id}
            />
          ))
        ) : (
          <h1>No hay productos en esta Categoría</h1>
        )}
      </div>
      <div className={s.divPagination}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          goToPrevPage={goToPrevPage}
          goToNextPage={goToNextPage}
        />
      </div>
    </div>
  );
};

export default ProductsByCategory;