import axios from 'axios';
export default function apiCaller(menthod = 'GET', url, data){
    return axios({
        method: menthod,
        url: url,
        data: data
    }).catch( err => {
        console.log(err);
    });
};