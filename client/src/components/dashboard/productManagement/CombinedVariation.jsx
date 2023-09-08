import React, { useState, useEffect } from "react";
import s from "./CombinedVariation.module.css";
import { useDispatch, useSelector } from "react-redux";

function CombinedVariation({ 
    combinedVariation, 
    setCombinedVariation, 
    combinedActive, 
    setCombinedActive, 
    selectedSizes, 
    selectedColors 
  }
) {

  //selectedSizes = [{id: 1, name: "S"}, {id: 2, name: "M"}]
  //selectedColors = [{id: 1, name: "Red"}, {id: 2, name: "Blue"}]
  //combinedVariation = [{size: "S", color: "Red"}, {size: "S", color: "Blue"}, {size: "M", color: "Red"}, {size: "M", color: "Blue"}]

  function createCombinedVariation() {
    let newCombinedVariation = [];
    selectedSizes.forEach((size) => {
      selectedColors.forEach((color) => {
        newCombinedVariation.push({size: size.name, color: color.name, stock: 0});
      })
    })
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
              </div>
            )
          })
        }
      </div>
    </div>
  )
}


export default CombinedVariation;


// function createCombinedVariation() {
//   let newCombinedVariation = {};
//   selectedSizes.forEach((size) => {
//     newCombinedVariation[size.name] = {};
//     selectedColors.forEach((color) => {
//       newCombinedVariation[size.name][color.name] = 0;
//     })
//   })
//   setCombinedVariation(newCombinedVariation);
// }

// useEffect(() => {
//   createCombinedVariation();
// }, [selectedSizes, selectedColors])

{/* <div className={s.container}>
        {
          selectedSizes.map((size) => {
            return(
              <div>
                <h3>{size.name}</h3>
                {
                  selectedColors.map((color) => {
                    return(
                      <div>
                        <h4>{color.name}</h4>
                        <input 
                          type="number" 
                          placeholder="Stock"
                          onChange={(e) => {
                            let newCombinedVariation = combinedVariation;
                            newCombinedVariation[size.name][color.name] = e.target.value;
                            setCombinedVariation(newCombinedVariation);
                          }}
                        />
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div> */}

                {/* <input 
                  type="number" 
                  placeholder="Stock"
                  onChange={(e) => {
                    let newCombinedVariation = combinedVariation;
                    newCombinedVariation.forEach((item) => {
                      if(item.size === variation.size && item.color === variation.color) {
                        item.stock = e.target.value;
                      }
                    })
                    setCombinedVariation(newCombinedVariation);
                  }}
                /> */}