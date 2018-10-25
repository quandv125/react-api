import axios from 'axios';

export default function apiCaller(menthod = 'GET', url, data){
    const TOKEN = sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).access_token : '';
    
    return axios({
        headers: {"Authorization" : `Bearer ${TOKEN}`},
        method: menthod,
        url: url,
        data: data
    }).catch( err => {
        console.log(err);
        console.log(url);
    });
    
};
