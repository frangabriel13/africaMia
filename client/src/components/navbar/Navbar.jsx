import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from "react-router-dom";
import s from './Navbar.module.css'; // Asegúrate de ajustar la ruta correcta
import SearchBar from '../searchBar/SearchBar';
import logo from "../../assets/lododefinitivofd2.png";
import iconoLogin from '../../assets/a1.png'; // Ajusta la ruta según la ubicación de tus activos
import iconoCart from '../../assets/iconCart.png';
import iconoNoti from '../../assets/iconNoti.png';
import SubMenu from '../subMenu/SubMenu';

// Acciones de Redux (puedes adaptarlas según tus necesidades)
// Por ejemplo, si tienes una acción para cerrar sesión: import { logout } from '../redux/auth/actions';

const Navbar = () => {
  // Utiliza useSelector para acceder al estado de Redux
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  // Utiliza useDispatch para obtener el despachador de acciones de Redux
  const dispatch = useDispatch();

  // Función para manejar el cierre de sesión (puedes adaptarla según tus necesidades)
  const handleLogout = () => {
    // dispatch(logout()); // Despacha la acción de cierre de sesión
    // Puedes realizar otras tareas, como redireccionar a la página de inicio, etc.
  };

  

  return (
    <nav className={s.navbar}>
      <div className={s.navbarContainer}>
        {/* Logo a la izquierda */}
        <nav>
          <NavLink to={"/"}>
            <img src={logo} className={s.logo} />
          </NavLink>
        </nav>
        {/* Barra de busqueda */}
        <SearchBar />
        <div className={s.offer}>Ofertas Exlusivas solo por tiempo limitado</div>
      </div>
      <div className={s.navbarContainerTwo}>
          <div className={s.userMenu}>
             holaaa
          </div>
          <div className={s.userMenu}>
              <ul className={s.navLinks}>
                  <li className={s.subMenuContainer}>
                    <Link to="/categories" className={s.navLink}>
                     Categorías aqui
                      <SubMenu />
                    </Link>
                  </li>
                  <li><Link to="/productos" className={s.navLink}>Productos</Link></li>
                  <li><Link to="/categorias" className={s.navLink}>Categorías</Link></li>
                  {/* Agrega más enlaces según tus necesidades */}
              </ul>
          </div>
          <div className={s.userMenu}>
            {isAuthenticated ? (
                  // Si el usuario está autenticado, muestra opciones de usuario
                  <>
                    <span className={s.username}>Bienvenido, Usuario</span>
                    <button className={s.logoutButton} onClick={handleLogout}>Cerrar Sesión</button>
                  </>
                ) : (
                  // Si el usuario no está autenticado, muestra enlaces de inicio de sesión
                  <>
                    <Link to="/iniciar-sesion" className={s.loginLink}>
                    <img src={iconoLogin} alt="Icono de Inicio de Sesión" className={s.iconoLogin} />
                      Iniciar Sesión/</Link>
                    <Link to="/registrarse" className={s.registerLink}>Registrarse</Link>
          
                    <Link to="/cart" className={s.cartLink}>
                      <img src={iconoCart} alt="Icono de Carrito" className={s.iconoCart} />
                    </Link>
                    <Link to="/notification" className={s.smsLink}>
                      <img src={iconoNoti} alt="Icono de Mensaje" className={s.iconNoti} />
                    </Link>

                  </>
                )}
          </div>
      </div>    
    </nav>
  );
};

export default Navbar;
