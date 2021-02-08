import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

async function loginReq(action){
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    const resp = await axios({
        method: "POST",
        url: "http://localhost:8000/api/token/",
        data: {
            username: action.username,
            password: action.password
        },
        headers: headers,
    });
    const user = await resp.data;
    
    const access_token = user.access;
    const refresh_token = user.refresh;
    let decoded_access = jwt_decode(access_token);
    let decoded_refresh = jwt_decode(refresh_token); 
    
    setCookie('access', access_token);
    setCookie('refresh', refresh_token);

    const access_exp = decoded_access.exp;

    let current_time = Date.now() / 1000;
    if (access_exp < current_time){         // this is to check if the token expired in jwt_decode
        const resp = await axios.post('http://127.0.0.1:8000/api/refresh', data= refresh_token, headers=headers);
        const refresh = await resp.data;
        let decoded_access = jwt_decode(refresh.access_token);
        let decoded_refresh = jwt_decode(refresh.refresh_token); 
    
        setCookie('access', refresh.access_token);
        setCookie('refresh', refresh.refresh_token);
    };
}
