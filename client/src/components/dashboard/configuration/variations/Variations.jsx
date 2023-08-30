import React, { useEffect, useState } from "react";
import s from "./Variations.module.css";
import { useDispatch, useSelector } from "react-redux";

const Variations = () => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  return (
    <div className={s.container}>
      <h3>Variations</h3>
      <div>
        <ul>
          <li
            className={selectedTab === 0 ? s.selected : ""}
            onClick={() => handleTabClick(0)}
          >Size</li>
          <li
            className={selectedTab === 1 ? s.selected : ""}
            onClick={() => handleTabClick(1)}
          >Color</li>
        </ul>
        {
          selectedTab === 0 && (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Talle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>XS</td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                  </tr>
                </tbody>
              </table>
              {
                editMode ? (
                  <div>Editar</div>
                ) : (
                  <div>Crear</div>
                )
              }
            </div>
          ) || selectedTab === 1 && (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Color</th>
                    <th>Código</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Rojo</td>
                    <td>123123</td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                  </tr>
                </tbody>
              </table>
              {
                editMode ? (
                  <div>Editar</div>
                ) : (
                  <div>Crear</div>
                )
              }
            </div>
          )
        }
      </div>
    </div>
  );
};


export default Variations;