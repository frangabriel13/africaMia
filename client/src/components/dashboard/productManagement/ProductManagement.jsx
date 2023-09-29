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
  const [editingVariation, setEditingVariation] = useState(null);
  const [newVariationPrice, setNewVariationPrice] = useState("");
  
  useEffect(() => {
    dispatch(getProducts());
  }, [selectedTab]);

  useEffect(() => {
    dispatch(getVariations());
  }, [selectedTab]);

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
    // dispatch(deleteProduct(id));
    dispatch(deleteProduct(id))
    .then(() => {
      // Después de la eliminación, obtén la lista de productos actualizada
      dispatch(getProducts());
    });
  };

  const handleEditVariation = (variationId) => {
    // Encuentra la variación que se va a editar en función del ID
    const variationToEdit = variations.find((el) => el.id === variationId);
  
    if (variationToEdit) {
      // Al hacer clic en "Editar", establece la variación que se está editando en el estado
      setEditingVariation(variationToEdit);
      // También establece el precio actual de la variación en el estado newVariationPrice
      setNewVariationPrice(variationToEdit.price.toString()); // Convierte el precio a una cadena
    } else {
      console.error(`No se pudo encontrar la variación con ID ${variationId}`);
    }
  };

  const handleUpdateVariation = (e) => {
    e.preventDefault();
  
    // Verifica que la variación que se está editando esté definida
    if (editingVariation) {
      // Crea un objeto con la nueva información de la variación, incluido el nuevo precio
      const updatedVariation = {
        ...editingVariation,
        price: parseFloat(newVariationPrice), // Convierte el nuevo precio a un número flotante
        availability: editingVariation.availability,
      };
  
      // Llama a la acción para actualizar la variación en el estado global
      dispatch(updateVariation(updatedVariation))
        .then(() => {
          // Luego de la actualización exitosa, obtén la lista de variaciones actualizada
          dispatch(getVariations());
        });

      // Limpia el estado de newVariationPrice y cancela la edición
      setNewVariationPrice("");
      setEditingVariation(null);
    }
  };

  const compareVariationsBySize = (a, b) => {
    const sizeA = a.size.name;
    const sizeB = b.size.name;
  
    return sizeA - sizeB;
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
                        {/* <th>Imágen</th> */}
                        <th>Variable</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Habilitado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        products.map((el) => (
                          <tr key={el.id}>
                            <td>{el.id}</td>
                            <td>{el.name}</td>
                            {/* <td>{el.imgMain}</td> */}
                            <td>{el.isVariable ? 'Sí' : 'No'}</td>
                            <td>{el.category ? el.category.name : 'No'}</td>
                            <td>{el.price}</td>
                            <td>{el.availability ? 'Sí' : 'No'}</td>
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
                      <option>Seleccionar</option>
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
                          {/* <th>Color</th> */}
                          <th>Precio</th>
                          <th>Habilitado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          variations
                            .filter((el) => el.productId === selectedProduct) // Filtra las variaciones por el producto seleccionado
                            .slice()
                            .sort(compareVariationsBySize)
                            .map((el) => (
                              // Resto de tu código para mostrar las variaciones
                              <tr key={el.id}>
                                <td>{el.id}</td>
                                <td>{el.size ? el.size.name : 'Sin tamaño'}</td>
                                {/* <td>{el.color ? el.color.name : 'Sin color'}</td> */}
                                <td>{el.price}</td>
                                <td>{el.availability ? 'Sí' : 'No'}</td>
                                <td>
                                  <button onClick={() => handleEditVariation(el.id)}>Editar</button>
                                  {/* <button>Eliminar</button> */}
                                </td>
                              </tr>
                            ))
                        }                   
                      </tbody>
                    </table>
                  </div>
                )
              }
              {
                editingVariation &&
              <div className={s.editVariationForm}>
                <h3>Editar Variación</h3>
                <form onSubmit={handleUpdateVariation}>
                  <div>
                    <label htmlFor="newVariationPrice">Nuevo Precio:</label>
                    <input
                      type="text"
                      id="newVariationPrice"
                      value={newVariationPrice}
                      onChange={(e) => setNewVariationPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="availability">Habilitado</label>
                    <input
                      type="checkbox"
                      id="availability"
                      checked={editingVariation.availability}
                      onChange={(e) => {
                        const updatedVariation = {
                          ...editingVariation,
                          availability: e.target.checked,
                        };
                        setEditingVariation(updatedVariation);
                      }}
                    />
                  </div>
                  <div>
                    <button type="submit">Guardar</button>
                    <button onClick={() => setEditingVariation(null)}>Cancelar</button>
                  </div>
                </form>
              </div>
              }
            </div>
          </div>
          {/* <div className={s.preview}>
            <h3>Vista previa</h3>
            {
              previewProduct && (
                <div className={s.previewProduct} key={previewProduct.id}>
                  <h4>{previewProduct.name}</h4>
                  <img className={s.previewImg} src={previewProduct.imgMain} alt={previewProduct.name} />
                </div>
              )
            }
          </div> */}
        </div>
      </div>
      <ProductForm getProducts={getProducts} />
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