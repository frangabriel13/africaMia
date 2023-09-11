import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import s from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logoAlargadoAfricaMia.png";
import { getProducts, searchProductsHeader } from '../../redux/actions/productActions';


function Header() {
  const dispatch = useDispatch();
 
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null); // Referencia al input search para posicionar la ventana emergente
  const searchResultsRef = useRef(null); // Referencia a la ventana emergente

  const [showResults, setShowResults] = useState(false);
  const navbarSearchResults = useSelector((state) => state.product.navbarSearchResults); 
  console.log(navbarSearchResults);

  
  

  useEffect(() => {
     dispatch(getProducts());
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
    console.log(term);
    dispatch(searchProductsHeader(term));
    setShowResults(true);
  };

  // const handleSearchInputKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     handleSearch(searchTerm);
  //   }
  // };

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
            ref={inputRef}
            onClick={() => {setShowResults(true)}} 
            className={s.searchInput}
            type="text"
            onChange={handleSearchInputChange}
            // onKeyDown={handleSearchInputKeyPress}
            placeholder="Buscar" 
          />
          {
            showResults && (
              <div ref={searchResultsRef} className={s.searchResults}>
                {
                  navbarSearchResults.length === 0 && (
                    <div>no andaaaaaaaaa</div>
                  )
                }
                {
                  navbarSearchResults.map((result) => (
                    <div
                      key={result.id}
                      className={s.resultItem}
                      onClick={() => handleSearchResultClick(result.id)}  
                    >
                    <img src={result.images[0].url} alt={result.name} />
                      <span className={s.nameProduct}>{result.name}</span>
                      <span className={s.priceProduct}>${result.price}</span>
                    </div>
                  ))
                }
                {
                  navbarSearchResults.length > 5 && (
                    <div className={s.seeMore} onClick={handleSeeMoreClick}>
                      Ver más resultados
                    </div>
                  )
                }
              </div>
            )
          }
        </div>
        <div>  
          <nav>
            <NavLink to={"/"}>
              <img src={logo} className={s.logo} />
            </NavLink>
          </nav>
        </div>
        <div className={s.loginCart}>
          <Link to="/cart"><i className={`bi bi-cart3 ${s.icon}`}></i></Link>
          <i className={`bi bi-person ${s.icon}`}></i>
          
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