import Card from '../card/Card'
import style from './Cards.module.css';

// import img1 from "../../assets/imgPrueba.png";
import React, { useEffect, useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions/productActions';
//import { getCategories } from '../../redux/actions/categoryActions';


export default function Cards() {

  //const categories = useSelector(state => state.categories.allCategories)
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  


  useEffect(() => {
    dispatch(getProducts()); 
    //dispatch(getCategories());
    
  }, [dispatch]);



  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className={style.container}>
      {products &&
        products.map((c) => (
          <Card
            name={c.name}
            price={c.price}
            id={c.id}
            images={c.images[0].url}
            key={c.id}
            productId={c.id}
            onSelectProduct={handleProductSelect} // Pasar la función handleProductSelect como prop
          />
        ))} 
        
    </div>
  );
}