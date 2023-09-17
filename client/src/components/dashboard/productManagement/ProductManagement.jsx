import React, { useEffect, useState } from "react";
import s from "./ProductManagement.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getProductById, addProduct, deleteProduct, updateProduct } from "../../../redux/actions/productActions";
import { getVariations, addVariation, deleteVariation, updateVariation, filterVariations } from "../../../redux/actions/variationActions";
import ProductForm from "./ProductForm";
import EditProductForm from "./EditProductForm";

function ProductManagement() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const allProducts = useSelector((state) => state.product.allProducts);
  const variations = useSelector((state) => state.variation.variations);
  const allVariations = useSelector((state) => state.variation.allVariations);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  console.log(previewProduct)
  
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    dispatch(getVariations());
  }, [products]);

  useEffect(() => {
    // Actualiza la vista previa cuando se selecciona un producto
    const selected = allProducts.find((el) => el.id === selectedProduct);
    setPreviewProduct(selected);
  }, [selectedProduct]);

  const handleFilterVariations = (id) => {
    setSelectedProduct(parseInt(id));
    dispatch(filterVariations(id));
  };

  const handleEditProduct = (productId) => {
    const productToEdit = products.find((product) => product.id === productId);
    setEditingProduct(productToEdit);
  }

  const handleCancelEdit = () => {
    setEditingProduct(null);
  }

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className={s.container}>
      <h2>Administrar de productos</h2>
      <div className={s.content}>
        <div className={s.productContainer}>
          <div className={s.list}>
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
                            <td>{el.isVariable ? 'Sí' : 'No'}</td>
                            <td>{el.category ? el.category.name : 'No'}</td>
                            <td>{el.price}</td>
                            <td>{el.stock}</td>
                            <td>
                              <button onClick={() => {setSelectedProduct(el.id)}}>Ver</button>
                            </td>
                            <td>
                              <button onClick={() => handleEditProduct(el.id)}>Editar</button>
                              <button onClick={() => handleDeleteProduct(el.id)}>Eliminar</button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                ) : (
                  <div className={s.list}>
                    <select
                      // value={selectedProduct || ""}
                      onChange={(e) => handleFilterVariations(e.target.value)}
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
                          variations.map((el) => (
                            <tr key={el.id}>
                              <td>{el.id}</td>
                              <td>{el.size ? el.size.name : 'Sin tamaño'}</td>
                              <td>{el.color ? el.color.name : 'Sin color'}</td>
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
            </div>
          </div>
          <div className={s.preview}>
            <h3>Vista previa</h3>
            {
              previewProduct && (
                <div key={previewProduct.id}>
                  <h4>{previewProduct.name}</h4>
                  <img src={previewProduct.imgMain} alt={previewProduct.name} />
                </div>
              )
            }
          </div>
        </div>
      </div>
      <ProductForm />
      {
        editingProduct && (
          <EditProductForm 
            product={editingProduct}
            onCancelEdit={handleCancelEdit}
          />
        )
      }
    </div>
  );
}


export default ProductManagement;