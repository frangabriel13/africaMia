// import React, { useEffect, useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import s from "./Header.module.css";
// import { Link, NavLink } from "react-router-dom";
// import logo from "../../assets/logoAlargadoAfricaMia.png";
// import { getProducts, searchProductsHeader, addToCart } from '../../redux/actions/productActions';


// function Header() {
//   const dispatch = useDispatch();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   const [searchTerm, setSearchTerm] = useState('');
//   const inputRef = useRef(null);
//   const searchResultsRef = useRef(null);

//   const [showResults, setShowResults] = useState(false);
//   const navbarSearchResults = useSelector((state) => state.product.navbarSearchResults);

//   const headerRef = useRef(null);
//   const [scrolled, setScrolled] = useState(false);

//   // Obtén el estado global del carrito desde Redux
//   const cartItems = useSelector((state) => state.cart.cartItems);

//   // Define una variable para determinar si el carrito está vacío
//   const isCartEmpty = cartItems.length === 0;

//   // Agrega una clase de animación condicionalmente en función del estado del carrito
//   const cartIconClass = isCartEmpty ? '' : 'icon-added';

//   useEffect(() => {
//     // Agrega o quita la clase de notificación basada en si el carrito está vacío o no
//     const cartIcon = document.querySelector('.cart-icon');
//     if (cartIcon) {
//       if (isCartEmpty) {
//         cartIcon.classList.remove('icon-added');
//       } else {
//         cartIcon.classList.add('icon-added');
//         setTimeout(() => {
//           cartIcon.classList.remove('icon-added');
//         }, 500); // Elimina la clase después de 0.5 segundos (la misma duración que la animación CSS)
//       }
//     }
//   }, [isCartEmpty]);

//   // Obtén el icono del carrito utilizando una referencia de React
//   const cartIconRef = useRef(null);

//   useEffect(() => {
//     dispatch(getProducts());
//     const handleDocumentClick = (e) => {
//       if (searchResultsRef.current && !searchResultsRef.current.contains(e.target)) {
//         setShowResults(false);
//       }
//     };

//     document.addEventListener('click', handleDocumentClick);
//     return () => {
//       document.removeEventListener('click', handleDocumentClick);
//     };
//   }, [dispatch]);

//   const handleSearchInputChange = (e) => {
//     const term = e.target.value;
//     dispatch(searchProductsHeader(term));
//     setShowResults(true);
//   };

//   const handleSearchResultClick = (productId) => {
//     navigate(`/products/${productId}`);
//     setShowResults(false);
//   };

//   const handleSeeMoreClick = () => {
//     navigate(`/search/${searchTerm}`);
//     setShowResults(false);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 100) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const headerClass = scrolled ? `${s.containerGlobal} ${s.containerGlobalScrolled}` : s.containerGlobal;

//   // Asigna la referencia al elemento del DOM con la clase '.bi-cart3' cuando el componente se monta
//   useEffect(() => {
//     cartIconRef.current = document.querySelector('.bi-cart3');
//   }, []);

  

//  //`${s.containerGlobal}  ${showResults ? s.showResults : ''} ${fixedHeader ? s.fixedHeader : ''} ${fixedHeader ? s.headerNarrow : ''}
//   return (
//     <div ref={headerRef} className={headerClass}>
//       <div className={s.container}>
//         <nav>
//           <NavLink to={"/"}>
//             <img src={logo} className={s.logo} />
//           </NavLink>
//         </nav>
//       </div> 
      
    
//       <div className={s.navContainer}>
//         <div className={s.searchContainer}>
//           <input
//             ref={inputRef}
//             onClick={() => setShowResults(true)} 
//             className={s.searchInput}
//             type="text"
//             onChange={handleSearchInputChange}
//             placeholder="Buscar" 
//           />
//           {
//             showResults && (
//               <div ref={searchResultsRef} className={s.searchResults}>
//                 {
//                   navbarSearchResults.length === 0 && (
//                     <div>no andaaaaaaaaa</div>
//                   )
//                 }
//                 {
//                   navbarSearchResults.map((result) => (
//                     <div
//                       key={result.id}
//                       className={s.resultItem}
//                       onClick={() => handleSearchResultClick(result.id)}  >
//                       <img src={result.images[0]?.url || ''} alt={result.name} />
//                       <span className={s.nameProduct}>{result.name}</span>
//                       <span className={s.priceProduct}>${result.price}</span>
//                     </div>
//                   ))
//                 }
//                 {
//                   navbarSearchResults.length > 5 && (
//                     <div className={s.seeMore} onClick={handleSeeMoreClick}>
//                       Ver más resultados
//                     </div>
//                   )
//                 }
//               </div>
//             )
//           }
//         </div>
//         <div className={`${s.menuPc} ${isMenuOpen ? s.menuOpen : ''}`}>
//           <NavLink to={"/"} onClick={closeMenu}>
//             Inicio
//           </NavLink>
//           <NavLink to={"/tienda"} onClick={closeMenu}>
//             Tienda
//           </NavLink>
//           <NavLink to={"/como-comprar"} onClick={closeMenu}>
//             ¿Cómo comprar?
//           </NavLink> 
//           {/* <a href='#'>Categorías</a> */}
//           <NavLink to={"/contact"} onClick={closeMenu}>
//             Contacto
//           </NavLink>
//         </div>
         
//         <div className={s.burger}>
//           <i className={`bi bi-list ${s.icon}`} onClick={toggleMenu}></i>
//             {
//               isMenuOpen && (
//                 <div className={s.menuHamburguesa}>
//                   <ul>
//                     <li>
//                       <NavLink to={"/"} onClick={closeMenu}>
//                         Inicio
//                       </NavLink>
//                     </li>
//                     <li>
//                       <NavLink to={"/tienda"} onClick={closeMenu}>
//                         Tienda
//                       </NavLink>
//                     </li>
//                     <li>
//                       <NavLink to={"/como-comprar"} onClick={closeMenu}>
//                         ¿Cómo comprar?
//                       </NavLink>
//                     </li>
//                     {/* <li>
//                       <a href='#'>Categorías</a>
//                     </li> */}
//                     <li>
//                       <NavLink to={"/contact"} onClick={closeMenu}>
//                         Contacto
//                       </NavLink>
//                     </li>
//                   </ul>
//                 </div>
//               )
//             }
//           </div>

//           <div className={s.loginCart} >
//             <Link to="/cart">
//              <i className={`bi bi-cart3 ${s.icon} ${cartIconClass}`}></i>
//             </Link>
//             <span className={s.cartCounter}>{cartItems.length}</span>
//           </div>
//       </div>
//     </div>  
//   );
// }

// export default Header;

import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import s from './Header.module.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logoAlargadoAfricaMia.png';
import { getProducts, searchProductsHeader } from '../../redux/actions/productActions';

function Header() {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);
  const searchResultsRef = useRef(null);

  const [showResults, setShowResults] = useState(false);
  const navbarSearchResults = useSelector((state) => state.product.navbarSearchResults);

  const headerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
    const handleDocumentClick = (e) => {
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
    dispatch(searchProductsHeader(term));
    setShowResults(true);
  };

  const handleSearchResultClick = (productId) => {
    navigate(`/products/${productId}`);
    setShowResults(false);
  };

  const handleSeeMoreClick = () => {
    navigate(`/search/${searchTerm}`);
    setShowResults(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerClass = scrolled ? `${s.containerGlobal} ${s.containerGlobalScrolled}` : s.containerGlobal;

  return (
    <div ref={headerRef} className={headerClass}>
      <div className={s.container}>
        <nav>
          <NavLink to={'/'}>
            <img src={logo} className={s.logo} alt="Logo" />
          </NavLink>
        </nav>
      </div>

      <div className={s.navContainer}>
        <div className={s.menuPc}>
          <NavLink to={'/'}>Inicio</NavLink>
          <NavLink to={'/tienda'}>Tienda</NavLink>
          <NavLink to={'/como-comprar'}>¿Cómo comprar?</NavLink>
          <NavLink to={'/contact'}>Contacto</NavLink>
        </div>

        <div className={s.burger}>
          <i className={`bi bi-list ${s.icon}`} onClick={toggleMenu}></i>
          {isMenuOpen && (
            <div className={s.menuHamburguesa} onClick={closeMenu}>
              <ul>
                <li>
                  <NavLink to={'/'}>Inicio</NavLink>
                </li>
                <li>
                  <NavLink to={'/tienda'}>Tienda</NavLink>
                </li>
                <li>
                  <NavLink to={'/como-comprar'}>¿Cómo comprar?</NavLink>
                </li>
                <li>
                  <NavLink to={'/contact'}>Contacto</NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className={s.loginCart}>
          <Link to="/cart">
            <i className={`bi bi-cart3 ${s.icon}`}></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;