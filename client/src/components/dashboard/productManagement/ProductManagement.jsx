import React, { useEffect, useState } from "react";
import s from "./ProductManagement.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getProductById, addProduct, deleteProduct, updateProduct } from "../../../redux/actions/productActions";
import { getVariations, addVariation, deleteVariation, updateVariation } from "../../../redux/actions/variationActions";

function ProductManagement() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const allProducts = useSelector((state) => state.product.allProducts);
  const variations = useSelector((state) => state.variation.variations);
  const allVariations = useSelector((state) => state.variation.allVariations);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    dispatch(getVariations());
  }, [products]);

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
            <div className={s.tableContainer}>
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
                            <td>{el.category.name}</td>
                            <td>{el.price}</td>
                            <td>{el.stock}</td>
                            <td>
                              <button onClick={() => {setSelectedProduct(el.id)}}>Ver</button>
                            </td>
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
                  <div className={s.list}>
                    <select 
                      name="product"
                    >
                      {
                        allProducts.filter((el) => el.isVariable).map((el) => (
                          <option key={el.id} value={el.id}>{el.name}</option>
                        ))
                      }
                    </select>
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Talle</th>
                          <th>Color</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          allVariations.map((el) => (
                            <tr key={el.id}>
                              <td>{el.id}</td>
                              <td>{el.size.name}</td>
                              <td>{el.color.name}</td>
                              <td>
                                <button>Editar</button>
                                <button>Eliminar</button>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                )
              }
              <div className={s.preview}>
                <h3>Vista previa</h3>
                {
                  allProducts.filter((el) => el.id === selectedProduct).map((el) => (
                    <div key={el.id}>
                      <h4>{el.name}</h4>
                      <p>{el.description}</p>
                      <p>{el.price}</p>
                      <p>{el.stock}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default ProductManagement;