import React, { useEffect, useState } from "react";
import s from "./ProductForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../redux/actions/productActions";
import { getCategories } from "../../../redux/actions/categoryActions";
import { getImages } from "../../../redux/actions/imageActions";
import { getColors } from "../../../redux/actions/colorActions";
import { getSizes } from "../../../redux/actions/sizeActions";
import Images from "./Images";

function ProductForm() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const colors = useSelector((state) => state.color.colors);
  const sizes = useSelector((state) => state.size.sizes);
  const images = useSelector((state) => state.gallery.images);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [],
    price: 0,
    stock: 0,
    categoryId: "",
    imgMain: "",
    isVariable: false,
    availability: true,
  });
  const [imagesData, setImagesData] = useState([]);
  const [openGallery, setOpenGallery] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  console.log(selectedSizes)

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    dispatch(getImages());
  }, []);

  useEffect(() => {
    dispatch(getColors());
  }, []);

  useEffect(() => {
    dispatch(getSizes());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(formData));
  };

  const handleSelectSize = (e) => {
    console.log(e.target)
    const sizeId = e.target.value;
    // const sizeName = e.target.name;
    const sizeName = e.target.options[e.target.selectedIndex].getAttribute("name");
  
    const isSizeSelected = selectedSizes.some((size) => size.id === sizeId);
  
    if (!isSizeSelected) {
      const size = { id: sizeId, name: sizeName };
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  return (
    <div className={s.container}>
      <h2>Crear Producto</h2>
      <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
          />
        </div>
        <div>
          <label htmlFor="price">Precio:</label>
          <input 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="stock">Stock:</label>
          <input 
            type="number" 
            name="stock" 
            value={formData.stock} 
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="category">Categoría:</label>
          <select 
            name="category" 
            value={formData.categoryId} 
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
          >
            <option value="">Seleccionar</option>
            {
              categories.map((el) => (
                <option key={el.id} value={el.id}>{el.name}</option>
              ))
            }
          </select>
        </div>
        <div>
          <label htmlFor="image">Imágenes:</label>
          <button type="button" onClick={() => setOpenGallery(true)}>Añadir imágenes</button>
          {
            openGallery && (
              <Images 
                images={images}
                setOpenGallery={setOpenGallery}
                setImagesData={setImagesData}
                setFormData={setFormData}
              />
            )
          }
        </div>
        <div>
          <h3>Añadir variaciones:</h3>
          <label htmlFor="variable">Variable:</label>
          <input 
            type="checkbox" 
            name="variable" 
            checked={formData.isVariable} 
            onChange={(e) => setFormData({ ...formData, isVariable: e.target.checked })}
          />
          {
            formData.isVariable && (
              <div>
                <div>
                  <label htmlFor="availability">Disponibilidad:</label>
                  <input 
                    type="checkbox" 
                    name="availability" 
                    checked={formData.availability} 
                    onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
                  />
                </div>
                <div>
                  <label htmlFor="size">Talle:</label>
                  <select
                    name="size"
                    value={selectedSizes.id}
                    onChange={(e) => handleSelectSize(e)}
                  >
                    <option value="">Seleccionar</option>
                    {
                      sizes.map((el) => (
                        <option
                          key={el.id}
                          value={el.id}
                          name={el.name}
                        >{el.name}</option>
                      ))
                    }
                  </select>
                  <div>
                    <h5>Talles seleccionados:</h5>
                    <ul>
                      {
                        selectedSizes.map((el) => (
                          <li key={el.id}>{el.name}</li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              </div>
            )
          }
        </div>     
        <div>
          <button type="submit">Añadir</button>
        </div>
      </form>
    </div>
  );
}


export default ProductForm;