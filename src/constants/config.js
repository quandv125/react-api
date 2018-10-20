export const USER_URL = 'http://127.0.0.1:8000/api/auth/user/';

export const APP_URL = 'http://127.0.0.1:8000/api/auth/user';

export const LOGIN_URL = 'http://127.0.0.1:8000/api/auth/login';
export const LOGOUT_URL = 'http://127.0.0.1:8000/api/auth/logout';

export const URL_IMAGES = 'http://127.0.0.1:8000/images/';

export const GENDER_MALE = 0;
export const GENDER_FEMALE = 1;

export const DEACTIVED = 0;
export const ACTIVED = 1;

export const API_URL = 'http://127.0.0.1:8000/api/auth/';

export const PRODUCTS = 'products';
export const PRODUCT = 'product';

export const USERS = 'users';
export const USER = 'user';

export const USER_ADD = 'user/store';

export const ADMINISTRATOR = 14;
export const MANAGER = 15;
export const MEMBER = 16;

export const TOKEN = sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).access_token : '';
export const ISLOGIN = sessionStorage.getItem('authentication') ? true : false;

// Transition  
export const PAGETRANSITION = 'worksTransition';
export const LOGINTRANSITION = 'aboutTransition';
export const TRANSITIONSPEED = 300;