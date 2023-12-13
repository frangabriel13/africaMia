// SearchBar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import s from './SearchBar.module.css'; // Ajusta la ruta correcta para tus estilos

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const history = useNavigate();

  const handleSearch = () => {
    // Puedes hacer algo con el término de búsqueda, por ejemplo, redireccionar a la página de resultados
    history.push(`/resultados?query=${searchTerm}`);
  };

  return (
    <div className={s.searchBar}>
      <input
        type="text"
        placeholder="Buscar en Fabricante Directo..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className={s.searchButton} onClick={handleSearch}>
        <FaSearch className={s.iconSearch} />
      </button>
    </div>
  );
};

export default SearchBar;

