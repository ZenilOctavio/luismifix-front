// Base URL
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

// Routes
export const LOGIN_PAGE_PATHNAME = '/'
export const HOME_PAGE_PATHNAME = '/home'
export const USERS_PAGE_PATHNAME = '/users'
export const INVENTORY_PAGE_PATHNAME = '/inventory'

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
export const API_PROVIDER_BY_NAME_PATHNAME = API_PROVIDERS_PATHNAME + '/search'

export const API_TYPES_PATHNAME = 'api/types'
export const API_TYPES_PROVIDER_PATHNAME = API_TYPES_PATHNAME + '/typesProvider'