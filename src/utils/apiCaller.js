import axios from 'axios';
// import * as config from './../constants/config';

export default function apiCaller(menthod = 'GET', url, data){
    return axios({
    	// headers: {"Authorization" : `Bearer ${config.TOKEN}`},
        method: menthod,
        url: url,
        data: data
    }).catch( err => {
        console.log(err);
    });
};