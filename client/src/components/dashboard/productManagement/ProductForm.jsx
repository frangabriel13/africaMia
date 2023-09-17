import React, { useEffect, useState } from "react";
import s from "./ProductForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../redux/actions/productActions";
import { getCategories } from "../../../redux/actions/categoryActions";
import { getImages } from "../../../redux/actions/imageActions";
import { getColors } from "../../../redux/actions/colorActions";
import { getSizes } from "../../../redux/actions/sizeActions";
import Images from "./Images";
import CombinedVariation from "./CombinedVariation";

function ProductForm({getProducts}) {
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
    variations: [],
  });
  const [imagesData, setImagesData] = useState([]);
  const [openGallery, setOpenGallery] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [combinedVariation, setCombinedVariation] = useState([{}]);
  const [combinedActive, setCombinedActive] = useState(false);

  const [selectedSizeId, setSelectedSizeId] = useState("");
  const [selectedColorId, setSelectedColorId] = useState("");

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getColors());
  }, []);

  useEffect(() => {
    dispatch(getSizes());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Envía el formulario
    await dispatch(addProduct(formData));
  
    // Después de enviar el formulario con éxito, restablece los campos
    setFormData({
      name: "",
      description: "",
      images: [],
      price: 0,
      stock: 0,
      categoryId: "",
      imgMain: "",
      isVariable: false,
      availability: true,
      variations: [],
    });
  
    // Después de la creación, obtén la lista de productos actualizada
    dispatch(getProducts());
  };

  const handleSelectSize = (e) => {
    const sizeId = e.target.value;
    const sizeName = e.target.options[e.target.selectedIndex].getAttribute("name");
  
    if (sizeId && !selectedSizes.some((size) => size.id === sizeId)) {
      const size = { id: sizeId, name: sizeName };
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleSelectColor = (e) => {
    const colorId = e.target.value;
    const colorName = e.target.options[e.target.selectedIndex].getAttribute("name");
  
    if (colorId && !selectedColors.some((color) => color.id === colorId)) {
      const color = { id: colorId, name: colorName };
      setSelectedColors([...selectedColors, color]);
    }
  };

  return (
    <div className={s.container}>
      <h2>Crear Producto</h2>
      <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={s.input}>
          <label htmlFor="name">Nombre:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          />
        </div>
        <div className={s.input}>
          <label htmlFor="description">Descripción:</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
          />
        </div>
        <div className={s.input}>
          <label htmlFor="price">Precio:</label>
          <input 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </div>
        <div className={s.input}>
          <label htmlFor="stock">Stock:</label>
          <input 
            type="number" 
            name="stock" 
            value={formData.stock} 
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          />
        </div>
        <div className={s.input}>
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
        <div className={s.input}>
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
          <div className={s.imgSelectContainer}>
            <h4>Imágenes seleccionadas</h4>
            <div className={s.imgContent}>
              {
                formData && formData.images.map(el => (
                  <div className={s.cardImg}>
                    <img src={el.url} alt="" />
                    <div className={s.btnImg}>
                    <label>
                      <input
                        type="radio"
                        name="imgMain"
                        value={el.url} // Puedes usar otro identificador único aquí si es necesario
                        checked={formData.imgMain === el.url} // Marca como seleccionada si es la imagen principal
                        onChange={(e) =>
                          setFormData({ ...formData, imgMain: e.target.value })
                        }
                      />
                      Elegir principal
                    </label>
                    <button>Eliminar</button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className={s.variationCOntainer}>
          <h3>Añadir variaciones:</h3>
          <div className={s.input}>
            <label htmlFor="variable">Variable:</label>
            <input 
              type="checkbox" 
              name="variable" 
              checked={formData.isVariable} 
              onChange={(e) => setFormData({ ...formData, isVariable: e.target.checked })}
            />
          </div>
          {
            formData.isVariable && (
              <div className={s.formData}>
                <div className={s.input}>
                  <label htmlFor="availability">Disponibilidad:</label>
                  <input 
                    type="checkbox" 
                    name="availability" 
                    checked={formData.availability} 
                    onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
                  />
                </div>
                <div className={s.input}>
                  <label htmlFor="size">Talle:</label>
                  <select
                    name="size"
                    value={selectedSizeId}
                    onChange={(e) => {
                      setSelectedSizeId(e.target.value);
                      handleSelectSize(e);
                    }}
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
                  <div className={s.input}>
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
                <div className={s.input}>
                  <label htmlFor="color">Color:</label>
                  <select
                    name="color"
                    value={selectedColorId}
                    onChange={(e) => {
                      setSelectedColorId(e.target.value);
                      handleSelectColor(e);
                    }}
                  >
                    <option value="">Seleccionar</option>
                    {
                      colors.map((el) => (
                        <option
                          key={el.id}
                          value={el.id}
                          name={el.name}
                        >{el.name}</option>
                      ))
                    }
                  </select>
                  <div>
                    <h5>Colores seleccionados:</h5>
                    <ul>
                      {
                        selectedColors.map((el) => (
                          <li key={el.id}>{el.name}</li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setCombinedActive(true)}
                >Generar variaciones</button>
                {
                  combinedActive && (
                    <CombinedVariation 
                      selectedSizes={selectedSizes}
                      selectedColors={selectedColors}
                      combinedVariation={combinedVariation}
                      setCombinedVariation={setCombinedVariation}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  )
                }
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