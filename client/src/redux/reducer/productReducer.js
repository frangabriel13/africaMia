const initialState = {
  products: [],
  allProducts: [],
  product: {},
  searchTerm: '',
  navbarSearchResults: [],
  sortOrder: 'relevance',
  productById: {},
  cartItems: [], 
  total: 0, 
};

// Constants
const PRICE_ASC = 'price_asc';
const PRICE_DESC = 'price_desc';

// Función para ordenar los productos por precio
function sortProducts(products, order) {
  if (order === PRICE_ASC) {
    return products.sort((a, b) => a.price - b.price);
  } else if (order === PRICE_DESC) {
    return products.sort((a, b) => b.price - a.price);
  }
}
function searchProducts(products, searchTerm) {
  const keyword = searchTerm.trim().toLowerCase();

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword)
  );

  console.log("Filtered products:", filteredProducts);

  return filteredProducts;
}

export function searchProductsHeader(products, searchTerm) {
  const keyword = searchTerm.trim().toLowerCase();
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword)
  );

  console.log('Search Term:', searchTerm);
  console.log('Filtered Products:', filteredProducts);

  return filteredProducts;
}

// Función para agregar un producto al carrito
const addToCart = (product) => {
  // Realiza la lógica para agregar el producto al carrito (por ejemplo, actualiza el estado)
  const updatedCart = [...cartItems, product];
  setCartItems(updatedCart);

  // Almacena el carrito actualizado en el localStorage
  localStorage.setItem('cartItems', JSON.stringify(updatedCart));
};

// Función para eliminar un producto del carrito
const removeFromCart = (productId) => {
  // Realiza la lógica para eliminar el producto del carrito (por ejemplo, actualiza el estado)
  const updatedCart = cartItems.filter((item) => item.id !== productId);
  setCartItems(updatedCart);

  // Almacena el carrito actualizado en el localStorage
  localStorage.setItem('cartItems', JSON.stringify(updatedCart));
};



function productReducer(state = initialState, action) {
  switch(action.type) {
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
      }
    case 'GET_PRODUCT_BY_ID':
      return {
        ...state,
        productById: action.payload,
      }
    case 'ADD_PRODUCT':
      return {
        ...state,
      }
    case 'DELETE_PRODUCT':
      return {
        ...state,
      }
    case 'UPDATE_PRODUCT':
      return {
        ...state,
      }
      case 'FILTER_PRODUCTS':
        const allProducts = state.allProducts;
        if (action.payload) {
          const productFiltered = allProducts.filter((el) => el.categoryId === parseInt(action.payload));
          return {
            ...state,
            products: productFiltered,
          };
        } else {
          // Si categoryId no está definido, devuelve todos los productos
          return {
            ...state,
            products: allProducts,
          };
        }
      case 'ORDER_BY_PRICE':
        const sortedProducts = sortProducts(state.products, action.payload);
     
            return {
                  ...state,
                products: [...sortedProducts],
              };
  case 'SEARCH_PRODUCTS':
        const searchResult = searchProducts(state.allProducts, action.payload);
            return {
                ...state,
                products: [...searchResult],
              };
 
  
            case 'SEARCH_PRODUCTS_NAVBAR':
              const keyword = action.payload.trim().toLowerCase();
              // Llamar a la función searchProductsHeader para obtener los resultados
              const searchResults = searchProductsHeader(state.allProducts, keyword);
            
              // Puedes limitar la cantidad de resultados que se muestran en el navbar, por ejemplo, a 5 resultados
              const navbarResults = searchResults.slice(0, 5);
            
              return {
                ...state,
                navbarSearchResults: navbarResults,
              };
              case 'CLEAR_SEARCH_RESULTS':
                return {
                  ...state,
                  navbarSearchResults: []
                }  
                case 'ADD_TO_CART':
  // Lógica para agregar un producto al carrito
  const updatedCartAdd = [...state.cartItems, action.payload];
  localStorage.setItem('cartItems', JSON.stringify(updatedCartAdd)); // Almacena el carrito actualizado en el localStorage
  return {
    ...state,
    cartItems: updatedCartAdd,
    total: state.total + action.payload.price,
  };
case 'REMOVE_FROM_CART':
  // Lógica para eliminar un producto del carrito
  const updatedCartRemove = state.cartItems.filter((item) => item.id !== action.payload);
  localStorage.setItem('cartItems', JSON.stringify(updatedCartRemove)); // Almacena el carrito actualizado en el localStorage
  return {
    ...state,
    cartItems: updatedCartRemove,
    total: state.total - /* Precio del producto eliminado */ action.payload.price,
  };                
    default:
      return state;
  }
}


export default productReducer;