import React, { useEffect, useState } from "react";
import s from "./ProductManagement.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, addProduct, deleteProduct, updateProduct } from "../../../redux/actions/productActions";

function ProductManagement() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const allProducts = useSelector((state) => state.product.allProducts);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className={s.container}>
      <h2>Administración de productos</h2>
      <div className={s.content}>
        <div className={s.productContainer}>
          <div className={s.list}>
            <h3>Productos</h3>
            <ul>
              <li className={selectedTab === 0 ? s.selected : ""} onClick={() => setSelectedTab(0)}>Productos</li>
              <li className={selectedTab === 1 ? s.selected : ""} onClick={() => setSelectedTab(1)}>Variaciones</li>
            </ul>
            {
              selectedTab === 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Imágen</th>
                      <th>Variable</th>
                      <th>Categoría</th>
                      <th>Precio</th>
                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      products.map((el) => (
                        <tr key={el.id}>
                          <td>{el.id}</td>
                          <td>{el.name}</td>
                          <td>{el.imgMain}</td>
                          <td>{el.isVariable}</td>
                          <td>{el.categoryId}</td>
                          <td>{el.price}</td>
                          <td>{el.stock}</td>
                          <td>
                            <button>Editar</button>
                            <button>Eliminar</button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              ) : (
                <div className={s.productList}>
                  <div className={s.productItem}>
                    <div className={s.productInfo}>
                      <h4>Nombre</h4>
                      <p>Descripción</p>
                    </div>
                    <div className={s.productActions}>
                      <button>Editar</button>
                      <button>Deletear</button>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
          <div className={s.preview}>
            <h3>Vista previa</h3>
            <p>Imagen del producto</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default ProductManagement;