import React, { useEffect, useState } from "react";
import s from "./Categories.module.css";
import { useDispatch, useSelector } from "react-redux";
import { 
  getCategories, 
  addCategory, 
  filterCategories, 
  deleteCategory, 
  updateCategory } from "../../../../redux/actions/categoryActions";
import { formatName } from "../../../../utils/helpers";

function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const allCategories = useSelector((state) => state.category.allCategories);
  const [selectedTab, setSelectedTab] = useState("categories");
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [parentCategory, setParentCategory] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [category, setCategory] = useState({});
  const [parentSelect, setParentSelect] = useState('');

  // useEffect(() => {
  //   if (selectedTab === 'categories') {
  //     dispatch(getCategories());
  //   } else if (selectedTab === 'subcategories') {
  //     dispatch(filterCategories(parentSelect)); // Usar selectedParentCategory en lugar de parentCategory
  //   }
  // }, [dispatch, selectedTab, parentSelect]);
  useEffect(() => {
    if (selectedTab === 'categories') {
      dispatch(getCategories());
    } else if (selectedTab === 'subcategories') {
      // Verifica si selectedParentCategory está vacío y selecciona la primera categoría padre si lo está
      if (!parentSelect) {
        const firstCategory = allCategories.find((el) => el.parentId === null);
        if (firstCategory) {
          setParentSelect(firstCategory.id);
        }
      }
      dispatch(filterCategories(parentSelect)); // Usar selectedParentCategory en lugar de parentCategory
    }
  }, [dispatch, selectedTab, parentSelect, allCategories]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if(tab === 'subcategories') {
      const firstCategory = allCategories.find((el) => el.parentId === null);
      if(firstCategory) {
        setParentCategory(firstCategory.id);
        dispatch(filterCategories(firstCategory.id));
      }
    }
  };

  const handleAddCategory = async () => {
    const categoryExists = categories.find((el) => el.name.toLowerCase() === categoryName.toLowerCase().trim());

    if(categoryName.trim() === "") {
      setError("El nombre de la categoría no puede estar vacío");
    } else if(categoryExists) {
      setError("La categoría ya existe");
    } else {
      const newCategoryData = { name: categoryName.trim(), parentId: parentCategory === '' ? null : parentCategory };
      await dispatch(addCategory(newCategoryData));
      setParentCategory("");
      setError("");
      await dispatch(getCategories());
      if (selectedTab === "subcategories") {
        dispatch(filterCategories(newCategoryData.parentId));
      }
    }
  };

  const handleFilterCategories = (id) => {
    setParentSelect(id);
    dispatch(filterCategories(id));
  };

  const handleDeleteCategory = async (id) => {
    // await dispatch(deleteCategory(id));
    // await dispatch(getCategories());
    // if(selectedTab === "subcategories") {
    //   const firstCategory = allCategories.find((el) => el.parentId === null);
    //   if(firstCategory) {
    //     setParentCategory(firstCategory.id);
    //     dispatch(filterCategories(firstCategory.id));
    //   }
    // }
    const categoryToDelete = allCategories.find((el) => el.id === id);
    await dispatch(deleteCategory(id));
    await dispatch(getCategories());
  
    // Filtrar las subcategorías de la categoría padre si está seleccionada la pestaña "subcategories"
    if(selectedTab === "subcategories" && categoryToDelete) {
      dispatch(filterCategories(categoryToDelete.parentId));
    }
  };

  const handleEditCategory = (id) => {
    const categoryToEdit = allCategories.find((el) => el.id === id);
    if(categoryToEdit) {
      setCategory(categoryToEdit);
      setCategoryName(categoryToEdit.name);
      setParentCategory(categoryToEdit.parentId || '');
      setEditMode(true);
    }
  };

  const handleUpdateCategory = async () => {
    const categoryExists = allCategories.find((el) => el.name.toLowerCase() === categoryName.toLowerCase().trim() && el.id !== category.id);

    if(categoryName.trim() === "") {
      setError("El nombre de la categoría no puede estar vacío");
    } else if(categoryExists && categoryExists.name.toLowerCase() !== category.name.toLowerCase()) {
      setError("La categoría ya existe");
    } else {
      // await dispatch(updateCategory({ id: category.id, name: categoryName.trim(), parentId: parentCategory === '' ? null : parentCategory }));
      const updatedCategoryData = { id: category.id, name: categoryName.trim(), parentId: parentCategory === '' ? null : parentCategory };
      await dispatch(updateCategory(updatedCategoryData));
      setCategoryName("");
      setParentCategory("");
      setError("");
      setEditMode(false);
      await dispatch(getCategories());
      if (selectedTab === 'subcategories') {
        dispatch(filterCategories(updatedCategoryData.parentId));
      }  
    }
  };

  const handleCancelEdit = () => {
    setCategoryName("");
    setParentCategory("");
    setError("");
    setEditMode(false);
  };

  return (
    <div className={s.container}>
      <h3>Administrar categorías</h3>
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
                        category.parentId === null && (
                          <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{formatName(category.name)}</td>
                            <td>
                              <button onClick={() => handleEditCategory(category.id)}>Editar</button>
                              <button onClick={() => handleDeleteCategory(category.id)}>Eliminar</button>
                            </td>
                          </tr>
                        )
                      ))
                    }
                  </tbody>
                </table>
              </div>
            ) || selectedTab === "subcategories" && (
              <div>
                <select onChange={(e) => handleFilterCategories(e.target.value)}>
                  <option value="">Seleccionar</option>
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
                            <button onClick={() => handleEditCategory(category.id)}>Editar</button>
                            <button onClick={() => handleDeleteCategory(category.id)}>Eliminar</button>
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
                    <input type="text" name="name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                  </label>
                  { error && <div className={s.error}>{error}</div> }
                </div>
                <div className={s.parentForm}>
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
                <div className={s.buttonsForm}>
                  <input type="button" value="Cancelar" onClick={() => handleCancelEdit()} />
                  <input type="button" value="Actualizar" onClick={() => handleUpdateCategory()} />
                </div>
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
                  { error && <div className={s.error}>{error}</div> }
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
                <input type="button" value="Agregar" onClick={() => handleAddCategory()} />
              </form>
            </div>
          )
        }
      </div>
    </div>
  );
}


export default Categories;