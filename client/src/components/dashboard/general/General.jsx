import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from "../../../redux/actions/authActions";

function General() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  // console.log('user: ', user)

  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    // console.log('antes de llamar a setUser')
    dispatch(setUser());
  }, [dispatch]);

  const handleEditClick = () => {
    setEditMode(true);
    setEditedUser({ ...user });
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleSaveClick = () => {
    // Aquí puedes enviar los datos editados al servidor y actualizar el usuario en el estado global.
    // Por ejemplo, podrías dispatch una acción como 'editUser' con los datos editados y enviar una solicitud al servidor.

    // Después de editar y guardar, desactiva el modo de edición.
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Información General</h2>
      {user && !editMode && (
        <div>
          <p>Nombre: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleEditClick}>Editar</button>
        </div>
      )}
      {editMode && (
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            name="password"
            value={editedUser.password}
            onChange={handleChange}
          />
          <div>
            <button onClick={handleSaveClick}>Guardar</button>
            <button onClick={handleCancelClick}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default General;