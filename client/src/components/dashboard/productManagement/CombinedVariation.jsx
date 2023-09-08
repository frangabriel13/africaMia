import React, { useState, useEffect } from "react";
import s from "./CombinedVariation.module.css";
import { useDispatch, useSelector } from "react-redux";

function CombinedVariation({ 
    combinedVariation, 
    setCombinedVariation, 
    combinedActive, 
    setCombinedActive, 
    selectedSizes, 
    selectedColors,
    formData,
    setFormData
  }
) {
  
  //formData = {name: "Camiseta", price: '10', stock: 10, categoryId: 1, imgMain: "https://www.google.com", isVariable: true, availability: true}

  const [variationData, setVariationData] = useState({
    size: "",
    color: "",
    price: formData.price,
  });

  //selectedSizes = [{id: 1, name: "S"}, {id: 2, name: "M"}]
  //selectedColors = [{id: 1, name: "Red"}, {id: 2, name: "Blue"}]
  //combinedVariation = [{size: "S", color: "Red"}, {size: "S", color: "Blue"}, {size: null, color:"Blue"}, {size: S, color: null ]

  function createCombinedVariation() {
    let newCombinedVariation = [];
  
    if (selectedSizes.length > 0 && selectedColors.length > 0) {
      // Si hay tamaños y colores seleccionados
      selectedSizes.forEach((size) => {
        selectedColors.forEach((color) => {
          newCombinedVariation.push({ 
            size: size.name, 
            color: color.name
          });
        });
      });
    } else if (selectedSizes.length > 0) {
      // Si solo hay tamaños seleccionados
      selectedSizes.forEach((size) => {
        newCombinedVariation.push({ 
          size: size.name, 
          color: null
        });
      });
    } else if (selectedColors.length > 0) {
      // Si solo hay colores seleccionados
      selectedColors.forEach((color) => {
        newCombinedVariation.push({ 
          size: null, 
          color: color.name
        });
      });
    } else {
      // Si no se ha seleccionado ni tamaño ni color
      newCombinedVariation.push({ 
        size: null, 
        color: null
      });
    }
  
    setCombinedVariation(newCombinedVariation);
  }

  useEffect(() => {
    createCombinedVariation();
  }, [selectedSizes, selectedColors])

  return(
    <div>
      <h2>Todas las variaciones</h2>
      <div className={s.container}>
        {
          combinedVariation.map((variation, index) => {
            return(
              <div key={index} className={s.variation}>
                <h3>{variation.size} - {variation.color}</h3>
                <input 
                  type="number" 
                  name="price"
                  placeholder="Precio"
                  // value={variationData.price}
                  defaultValue={variationData.price}
                />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}


export default CombinedVariation;