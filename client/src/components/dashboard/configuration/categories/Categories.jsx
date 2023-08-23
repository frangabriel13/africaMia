import React, { useEffect, useState } from "react";
import s from "./Categories.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../../redux/actions/categoryActions";

function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const allCategories = useSelector((state) => state.category.allCategories);
  const [selectedTab, setSelectedTab] = useState("categories");

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className={s.container}>
      <h2>Administrar categorías</h2>
      <div className={s.divCategory}>
        <div className={s.divTable}>
          <ul className={s.categories}>
            <li
              className={selectedTab === "categories" ? s.active : ""}
              onClick={() => handleTabChange("categories")}
            >Categorías</li>
            <li
              className={selectedTab === "subcategories" ? s.active : ""}
              onClick={() => handleTabChange("subcategories")}
            >Subcategorías</li>
            <li
              className={selectedTab === "subsubcategories" ? s.active : ""}
              onClick={() => handleTabChange("subsubcategories")}
            >Sub-subcategorías</li>
          </ul>
          {
            selectedTab === "categories" && (
              <div className={s.listCategories}>
                <table className={s.table}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      categories.map((category) => (
                        <tr key={category.id}>
                          <td>{category.id}</td>
                          <td>{category.name}</td>
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
            ) || selectedTab === "subcategories" && (
              <div>
                <select>
                  {
                    allCategories.filter((category) => category.parentId === null).map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))
                  }
                </select>
                <table className={s.table}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      categories.map((category) => (
                        <tr key={category.id}>
                          <td>{category.id}</td>
                          <td>{category.name}</td>
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
    </div>
  );
}


export default Categories;