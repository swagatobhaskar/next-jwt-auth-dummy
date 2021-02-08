import Cookies from 'js-cookie';
import jwt_decode, { InvalidTokenError } from 'jwt-decode';

// decode both access and refresh token in the 
export const handleToken = (user) => {
    console.log('access_token: ', user.access);
    console.log('refresh_token: ', user.refresh);
    
    const access_token = user.access;
    const refresh_token = user.refresh;

    let decoded_access = jwt_decode(access_token);
    let decoded_refresh = jwt_decode(refresh_token);
    console.log(decoded_access);
    console.log(decoded_refresh);

    const access_exp = decoded_access.exp;
    let current_time = Date.now() / 1000;
    // Check if token is valid
    // Invalid if token exp time is less than current time
    if (access_exp < current_time){
        console.log("Invalid token--throwing error!");
        return InvalidTokenError;
    }
    
    setCookie('access', access_token);
    setCookie('refresh', refresh_token);
}

export const handleRefreshToken = (token) => {
    console.log('new access_token: ', token.access);
    
    const access_token = token.access;
    
    let decoded_access = jwt_decode(access_token);
    console.log(decoded_access);
    
    const access_exp = decoded_access.exp;
    let current_time = Date.now() / 1000;
    // Check if token is valid
    // Invalid if token exp time is less than current time
    if (access_exp < current_time){
        console.log("Invalid token--throwing error!");
        return InvalidTokenError;
    }
    
    setCookie('access', access_token);    
}

export const setCookie = (key, value) => {
    if (process.browser) {
        Cookies.set(key, value, {
            expires: 1,
            path: '/'
        });
    }
};

export const removeCookie = key => {
    if (process.browser) {
        Cookies.remove(key, {
            expires: 1
        });
    }
};

export const getCookie = (key, req) => {
    return process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req);
};

const getCookieFromBrowser = key => {
    return Cookies.get(key);
};

const getCookieFromServer = (key, req) => {
    if (!req.headers.cookie) {
        return undefined;
    }
    const rawCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${key}=`));
    if (!rawCookie) {
        return undefined;
    }
    return rawCookie.split('=')[1];
};