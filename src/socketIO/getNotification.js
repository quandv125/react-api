// import React from 'react';
import { connectIO } from './../socketIO/client';
import {  toast } from 'react-toastify';
import * as config from './../constants/config';
export const notification = () => {
    const role_id = sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).role_id : '';
    const service_id = sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).service_id : '';
    if(role_id && role_id === config.ASSISTANT){
        connectIO(message => {
            
            if(String(service_id) === String(message)) {
                console.log('123 tét ok');
                toast.success("Bạn có bệnh nhân khám mới !", { position: "top-right", autoClose: false, hideProgressBar: true, closeOnClick: true });
            }
        });
    }
    return true;
}
