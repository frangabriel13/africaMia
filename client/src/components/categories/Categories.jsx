import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/actions/categoryActions';
import s from './Categories.module.css';
import { Link } from 'react-router-dom'; // Importa Link de React Router

function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    // Cuando el componente se monta, obtén todas las categorías
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className={s.categoriesContainer}>
      <h2 className={s.categoryTitle}>Categorías</h2>
      <ul className={s.categoryList}>
        {categories.map((category) => (
          <li key={category.id} className={s.categoryItem}>
            <Link to={`/categories/${category.id}`}>{category.name}</Link> {/* Enlace a la página de productos */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;


