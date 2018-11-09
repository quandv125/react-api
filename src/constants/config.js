
export const URL_SOCKET = 'http://183.91.11.132:100';
var domain = 'http://183.91.11.132/pvm_api/public/api/auth/';  

// export const URL_SOCKET = 'http://localhost:100/';
// var domain = 'http://127.0.0.1:8000/api/auth/';

export const USER_URL = domain + 'user';
export const USERS_URL = domain + 'users';

export const PRODUCT_URL = domain + 'product';
export const CUSTOMER_URL = domain + 'customer';
export const SMS_URL = domain + 'sms';

export const ORDER_URL = domain + 'order';
export const ORDERS_URL = domain + 'orders';

export const ORDER_DETAIL_URL = domain + 'order-detail';
export const CATEGORY_URL = domain + 'product-category';
export const SERVICE_URL = domain + 'product-service';
export const SERVICES_URL = domain + 'product-services';

export const SMS_CATEGORY_URL = domain + 'sms-categories';
export const PERMISSION_URL = domain + 'permission';
export const PERMISSIONS_URL = domain + 'permissions';
export const ROLE_URL = domain + 'role';
export const ROLES_URL = domain + 'roles';

export const APP_URL = domain + 'user';

export const LOGIN_URL = domain + 'login';
export const LOGOUT_URL = domain + 'logout';

export const CRMWORLDFONE_URL = domain + 'worldfone';

export const GENDER_MALE = 0;
export const GENDER_FEMALE = 1;

export const CURRENCY_VND = "VND";
export const CURRENCY_USD = "USD";

export const TYPE_YES = 1;
export const TYPE_NO = 0;

export const SMS_STATUS_ERROR = 'error';
export const SMS_STATUS_SUCCESS = 'success';

export const DEACTIVED = 0;
export const ACTIVED = 1;

export const IS_PUBLISH_YES = 1;
export const IS_PUBLISH_NO = 0;

export const API_URL = domain + '';

export const PRODUCTS = 'products';
export const PRODUCT = 'product';

export const USERS = 'users';
export const USER = 'user';

export const USER_ADD = 'user/store';

export const ADMINISTRATOR = 14;
export const MANAGER = 15;
export const MEMBER = 16;
export const ASSISTANT = 33;
export const RECRPTIONIST = 34;

export const TOKEN = sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).access_token : '';
export const ROLE = sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).role_id : '';
export const ISLOGIN = sessionStorage.getItem('authentication') ? true : false;

// Transition  
export const PAGETRANSITION = 'worksTransition';
export const LOGINTRANSITION = 'aboutTransition';
export const TRANSITIONSPEED = 300;

export const MSG_LOGIN = 'Error! Incorrect username/ password please try again.';

// export const URL_IMAGES = 'http://127.0.0.1:8000/images';