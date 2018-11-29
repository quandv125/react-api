// import React from 'react';
// import { connectIO } from './../socketIO/client';
// import {  toast } from 'react-toastify';
// import * as config from './../constants/config';
export const notification = () => {
    // const role_id = sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).role_id : '';
    // const service_id = sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).service_id : '';
    // if(role_id && role_id === config.ASSISTANT){
    //     connectIO(message => {            
    //         if(String(service_id) === String(message)) {
    //             toast.success("Bạn có bệnh nhân khám mới !", { position: "top-right", autoClose: false, hideProgressBar: true, closeOnClick: true });
    //             // this.audio = new Audio("http://183.91.11.132/music.mp3");
	// 			// this.audio.play()
    //         }
    //     });
    // }
    return true;
}
