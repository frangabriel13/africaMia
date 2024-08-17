import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions/productActions';
import Card from '../card/Card';
import s from './Cards.module.css';
import Pagination from '../pagination/Pagination';

export default function Cards() {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 25;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

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

  console.log('products', products);
  // console.log('imgMain', products[0].imgMain);

  return (
    <div className={s.container}>
      <div className={s.cardsContainer}>
        {currentProducts.map((product) => (
          <Card
            key={product.id}
            name={product.name}
            price={product.price}
            id={product.id}
            imgMain={product.imgMain}
            images={product.images}
            // images={product.images[0]?.url || ''}
            productId={product.id}
          />
        ))}
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
}