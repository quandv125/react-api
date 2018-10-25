export const USER_URL = 'http://127.0.0.1:8000/api/auth/user/';
export const PRODUCT_URL = 'http://127.0.0.1:8000/api/auth/product/';
export const CUSTOMER_URL = 'http://127.0.0.1:8000/api/auth/customer/';
export const SMS_URL = 'http://127.0.0.1:8000/api/auth/order/';
export const ORDER_URL = 'http://127.0.0.1:8000/api/auth/product/';
export const CATEGORY_URL = 'http://127.0.0.1:8000/api/auth/product-category/';

export const APP_URL = 'http://127.0.0.1:8000/api/auth/user';

export const LOGIN_URL = 'http://127.0.0.1:8000/api/auth/login';
export const LOGOUT_URL = 'http://127.0.0.1:8000/api/auth/logout';

export const URL_IMAGES = 'http://127.0.0.1:8000/images/';

export const GENDER_MALE = 0;
export const GENDER_FEMALE = 1;

export const CURRENCY_VND = "VND";
export const CURRENCY_USD = "USD";

export const TYPE_YES = 1;
export const TYPE_NO = 0;

export const DEACTIVED = 0;
export const ACTIVED = 1;

export const IS_PUBLISH_YES = 1;
export const IS_PUBLISH_NO = 0;

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

export const MSG_LOGIN = 'Error! Incorrect username/ password please try again.';