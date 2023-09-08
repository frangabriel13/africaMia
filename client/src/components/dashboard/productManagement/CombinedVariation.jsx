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
  console.log(combinedVariation)

  function createCombinedVariation() {
    let newCombinedVariation = [];
  
    if (selectedSizes.length > 0 && selectedColors.length > 0) {
      // Si hay tamaños y colores seleccionados
      selectedSizes.forEach((size) => {
        selectedColors.forEach((color) => {
          newCombinedVariation.push({ 
            size: {id: size.id, name: size.name},  
            color: {id: color.id, name: color.name},
            price: formData.price,
            stock: formData.stock,
            availability: formData.availability
          });
        });
      });
    } else if (selectedSizes.length > 0) {
      // Si solo hay tamaños seleccionados
      selectedSizes.forEach((size) => {
        newCombinedVariation.push({ 
          size: {id: size.id, name: size.name},
          color: null,
          price: formData.price,
          stock: formData.stock,
          availability: formData.availability
        });
      });
    } else if (selectedColors.length > 0) {
      // Si solo hay colores seleccionados
      selectedColors.forEach((color) => {
        newCombinedVariation.push({ 
          size: null, 
          color: {id: color.id, name: color.name},
          price: formData.price,
          stock: formData.stock,
          availability: formData.availability
        });
      });
    } else {
      // Si no se ha seleccionado ni tamaño ni color
      newCombinedVariation.push({ 
        size: null, 
        color: null,
        price: formData.price,
        stock: formData.stock,
        availability: formData.availability
      });
    }
    
    setCombinedVariation(newCombinedVariation);
  }

  useEffect(() => {
    createCombinedVariation();
  }, [selectedSizes, selectedColors])

  // Manejar cambios en el input de precio y stock
  const handlePriceChange = (e, index) => {
    const newCombinedVariation = [...combinedVariation];
    newCombinedVariation[index].price = parseFloat(e.target.value);
    setCombinedVariation(newCombinedVariation);
  };

  const handleStockChange = (e, index) => {
    const newCombinedVariation = [...combinedVariation];
    newCombinedVariation[index].stock = parseInt(e.target.value, 10);
    setCombinedVariation(newCombinedVariation);
  };

  return(
    <div>
      <h2>Todas las variaciones</h2>
      <div className={s.container}>
        {
          combinedVariation.map((variation, index) => {
            return(
              <div key={index} className={s.variation}>
                <h3>{variation.size ? variation.size.name : ''} - {variation.color ? variation.color.name : ''}</h3>
                <input 
                  type="number" 
                  name="price"
                  placeholder="Precio"
                  value={variation.price || 0}
                  onChange={(e) => handlePriceChange(e, index)}
                />
                <input 
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={variation.stock || 0}
                  onChange={(e) => handleStockChange(e, index)}
                />
                <input 
                  type="text"
                  name="availability"
                  placeholder="Habilitado"
                  value={variation.availability || ""}
                  onChange={(e) => {
                    const newCombinedVariation = [...combinedVariation];
                    newCombinedVariation[index].availability = e.target.value;
                    setCombinedVariation(newCombinedVariation);
                  }}
                />
              </div>
            )
          })
        }
      </div>
      <button
      >Añadir variaciones</button>
    </div>
  )
}


export default CombinedVariation;