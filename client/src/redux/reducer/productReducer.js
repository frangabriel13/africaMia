const initialState = {
  products: [],
  allProducts: [],
  product: {},
  searchTerm: '',
  navbarSearchResults: [],
  sortOrder: 'relevance',
  productById: {},
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
      const productFiltered = allProducts.filter((el) => el.categoryId === parseInt(action.payload));
      return {
        ...state,
        products: productFiltered,
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
 
  // case 'SET_CATEGORY_FILTER':
  //       const allProducts = state.allProducts;
  
  //         const filteredProducts = action.payload === 'All'
  //          ? allProducts
  //          : allProducts.filter(product => product.categories.some(category => category.name === action.payload));
 
  //           return {
  //               ...state,
  //               products: filteredProducts,
  //           };
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
    default:
      return state;
  }
}


export default productReducer;