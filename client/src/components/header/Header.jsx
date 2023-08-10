import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logoAlargadoAfricaMia.png";



function Header() {
const dispatch = useDispatch();
const [showResults, setShowResults] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


useEffect(() => {
  // dispatch(getProducts());
  const handleDocumentClick = (e) => {
    // Si el clic ocurre fuera de la ventana emergente, cerrarla
    if (searchResultsRef.current && !searchResultsRef.current.contains(e.target)) {
      setShowResults(false);
    }
  };

  document.addEventListener('click', handleDocumentClick);
  return () => {
    document.removeEventListener('click', handleDocumentClick);
  };
}, [dispatch]);

const handleSearchInputChange = (e) => {
  const term = e.target.value;
  setSearchTerm(term);

  dispatch(searchProductsHeader(term));
  setShowResults(true);
};

const handleSearchInputKeyPress = (e) => {
  if (e.key === 'Enter') {
    handleSearch(searchTerm);
  }
};

const handleSearchResultClick = (productId) => {
  navigate(`/products/${productId}`);
  setShowResults(false);
};

const handleSeeMoreClick = () => {
  navigate(`/search/${searchTerm}`);
  setShowResults(false);
};

  return (
    <div className={s.containerGlobal}>
       <div className={s.container}>
       
         <div className={s.searchContainer}>
           <i className={`bi bi-search ${s.icon}`}></i>
            <input
                // ref={inputRef} // Asociamos la referencia al input
                onClick={() => {
                  setShowResults(true);
                  }} 
                  className={s.searchInput}
                  type="text"
                  // value={searchTerm}
                  onChange={handleSearchInputChange}
                  onKeyDown={handleSearchInputKeyPress}
                  placeholder="Buscar" 
             />
              {showResults && (
                  <div ref={searchResultsRef} className={s.searchResults}>

                    {navbarSearchResults.length === 0 && (
                       <div>no andaaaaaaaaa</div>
                    )}

                    {navbarSearchResults.map((result) => (
                     <div
                      key={result.id}
                      className={s.resultItem}
                        onClick={() => handleSearchResultClick(result.id)}  
                     >
                            <img src={result.images[0]} alt={result.name} />
                            <span>{result.name}</span>
                            <span>${result.price}</span>
                     </div>
                                  ))}

                                    {navbarSearchResults.length > 5 && (
                                              <div className={s.seeMore} onClick={handleSeeMoreClick}>
                                                     Ver más resultados
                                              </div>
                                    )}

                   </div>
              )}
      
          </div>
              

         <div>  
            <nav>
              <NavLink to={"/"}>
                 <img src={logo} className={s.logo} />
              </NavLink>
           </nav>
         </div>
        <div className={s.loginCart}>
                    <i className={`bi bi-person ${s.icon}`}></i>
                    <i className={`bi bi-cart3 ${s.icon}`}></i>
        </div>
   
  </div>    
      <div className={s.nav}>
        <nav>
          <NavLink to={"/"}>
            Inicio
          </NavLink>
          <NavLink to={"/tienda"}>
            Tienda
          </NavLink>
          <NavLink to={"/como-comprar"}>
            ¿Cómo comprar?
          </NavLink>
            
          <a href='#'>Categorías</a>
          <NavLink to={"/contact"}>
            Contacto
          </NavLink>
        </nav>
      
        
      </div>
          <div className={s.burger}>
             <i className={`bi bi-list`} onClick={toggleMenu}></i>
          </div> 
    
</div>
  );
}

export default Header;