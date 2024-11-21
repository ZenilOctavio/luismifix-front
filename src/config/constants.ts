// Base URL
export const BACKEND_URL = (import.meta.env.DEV) ? import.meta.env.VITE_BACKEND_URL : window.location.origin
export const API_URL = import.meta.env.VITE_BACKEND_URL;

// Routes
export const LOGIN_PAGE_PATHNAME = '/'
export const REGISTER_PAGE_PATHNAME = '/register'
export const HOME_PAGE_PATHNAME = '/home'
export const USERS_PAGE_PATHNAME = '/users'
export const PROVIDERS_PAGE_PATHNAME = '/providers'
export const INVENTORY_PAGE_PATHNAME = '/inventory'
export const PRODUCTS_HISTORICAL_PAGE_PATHNAME = '/historical'
export const CLIENTS_PAGE_PATHNAME = '/clients'
export const BOARD_PAGE_PATHNAME = '/board'
export const TODO_PAGE_PATHNAME = '/to-do'

//Ecommerce
export const ECOMMERCE_PAGE_PATHNAME = '/ecommerce'
export const CATEGORIES_PAGE_PATHNAME = '/ecommerce/categories'
export const PRODUCTS_OF_CATEGORY_PAGE_PATHNAME = '/ecommerce/category/:id'
export const PRODUCT_PAGE_PATHNAME = '/ecommerce/product/:id'



//API Routes
export const API_REGISTER_PATHNAME = 'api/register'
export const API_LOGIN_PATHNAME = 'api/login'
export const API_LOGOUT_PATHNAME = 'api/logout'
export const API_PROFILE_PATHNAME = 'api/profile'

export const API_USERS_PATHNAME = 'api/users'
export const API_USERS_BY_USERNAME_PATHNAME = 'api/searchUserForUsername'

export const API_TYPES_USER_PATHNAME = 'api/types/typesUser'

export const API_PROVIDERS_PATHNAME = 'api/providers'
export const API_PROVIDER_PATHNAME = API_PROVIDERS_PATHNAME + '/provider'
export const API_PROVIDER_CONTACTS_PATHNAME = API_PROVIDERS_PATHNAME + '/contacts'
export const API_PROVIDER_POST_CONTACTS_PATHNAME = API_PROVIDERS_PATHNAME + '/contact'
export const API_PROVIDER_BY_NAME_PATHNAME = API_PROVIDERS_PATHNAME + '/search'

export const API_TYPES_PATHNAME = 'api/types'
export const API_TYPES_PROVIDER_PATHNAME = API_TYPES_PATHNAME + '/typesProvider'
export const API_TYPES_PROVIDER_CONTACT_PATHNAME = API_TYPES_PATHNAME + '/typesContact'
export const API_TYPES_PRODUCT_PATHNAME = API_TYPES_PATHNAME + '/typesProduct'

export const API_PRODUCTS_PATHNAME = 'api/products'
export const API_PRODUCTS_BY_TYPE_PATHNAME = API_PRODUCTS_PATHNAME + '/productsOftype'
export const API_PRODUCTS_BY_ID_PATHNAME = API_PRODUCTS_PATHNAME + '/product'
export const API_PRODUCTS_BY_NAME_PATHNAME = API_PRODUCTS_PATHNAME + '/search'
export const API_PRODUCTS_ENABLE_PATHNAME = API_PRODUCTS_PATHNAME + '/enable'
export const API_PRODUCTS_DISABLE_PATHNAME = API_PRODUCTS_PATHNAME + '/disable'

export const API_PURCHASES_PATHNAME = 'api/purchases'
export const API_PURCHASES_FOR_PROVIDER_PATHNAME = API_PURCHASES_PATHNAME + '/provider'
export const API_PURCHASES_FOR_PRODUCT_PATHNAME = API_PURCHASES_PATHNAME + '/product'
export const API_PURCHASES_ENABLE_PATHNAME = API_PURCHASES_PATHNAME + '/enable'
export const API_PURCHASES_DISABLE_PATHNAME = API_PURCHASES_PATHNAME + '/disable'

export const API_PRODUCTS_HISTORICAL_PATHNAME = 'api/historys/products'


export const API_IMAGES_PATHNAME = 'api/images'
export const API_IMAGES_UPLOAD = API_IMAGES_PATHNAME + '/upload'
export const API_IMAGES_GET = API_IMAGES_PATHNAME + '/product'

export const API_HISTORY_ORDERS_PATHNAME = '/api/historyOrders'
export const API_GET_CART_PATHNAME = API_HISTORY_ORDERS_PATHNAME + `/cart/:userId`
export const API_ADD_TO_CART_PATHNAME = API_HISTORY_ORDERS_PATHNAME + `/add`
export const API_UPDATE_CART_PATHNAME = API_HISTORY_ORDERS_PATHNAME + `/update`
export const API_TOTAL_CART_PATHNAME = API_HISTORY_ORDERS_PATHNAME + `/total/:userId`


console.log('isDev: ', import.meta.env.DEV)
console.log('mode: ', import.meta.env.MODE)
console.log('VITE_B_URL:', import.meta.env.VITE_BACKEND_URL)
console.log('windowLocation: ', window.location.href)
console.log('BACKEND_URL: ', BACKEND_URL)