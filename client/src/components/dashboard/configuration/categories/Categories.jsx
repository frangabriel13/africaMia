import React, { useEffect, useState } from "react";
import s from "./Categories.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, addCategory } from "../../../../redux/actions/categoryActions";

function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const allCategories = useSelector((state) => state.category.allCategories);
  const [selectedTab, setSelectedTab] = useState("categories");
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [parentCategory, setParentCategory] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleAddCategory = async () => {
    const categoryExists = categories.find((category) => category.name.toLowerCase() === categoryName.toLowerCase().trim());

    if(category.trim() === "") {
      setError("El nombre de la categoría no puede estar vacío");
    } else if(categoryExists) {
      setError("La categoría ya existe");
    } else {
      await dispatch(addCategory({ name: categoryName.trim(), parentId: parentCategory === '' ? null : parentCategory }));
      setCategoryName("");
      setError("");
      await dispatch(getCategories());
      if(selectedTab === "subcategories") {
        const firstCategory = allCategories.find((category) => category.parentId === null);
        if(firstCategory) {
          setParentCategory(firstCategory.id);
        }
      }
    }
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
        {
          editMode ? (
            <div className={s.divForm}>
              <h3>Editar categoría</h3>
              <form>
                <div className={s.nameForm}>
                  <label>
                    Nombre:
                    <input type="text" name="name" />
                  </label>
                </div>
                <div className={s.parentForm}>
                  <label>
                    Categoría padre:
                    <select>
                      <option value="">Ninguna</option>
                      {
                        allCategories.filter((category) => category.parentId === null).map((category) => (
                          <option key={category.id} value={category.id}>{category.name}</option>
                        ))
                      }
                    </select>
                  </label>
                </div>
                <input type="submit" value="Enviar" />
              </form>
            </div>
          ) : (
            <div className={s.divForm}>
              <h3>Agregar categoría</h3>
              <form>
                <div className={s.nameForm}>
                  <label>
                    Nombre:
                    <input type="text" name="name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                  </label>
                </div>  
                <div className={s.selectForm}>
                  <label>
                    Categoría padre:
                    <select value={parentCategory} onChange={(e) => setParentCategory(e.target.value)}>
                      <option value="">Ninguna</option>
                      {
                        allCategories.filter((category) => category.parentId === null).map((category) => (
                          <option key={category.id} value={category.id}>{category.name}</option>
                        ))
                      }
                    </select>
                  </label>
                </div>
                <input type="button" value="Agregar" onClick={handleAddCategory} />
              </form>
              {
                error && (
                  <div className={s.error}>
                    {error}
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    </div>
  );
}


export default Categories;