import React, { useState, useEffect } from 'react';
import api from '../services/interceptor'
import App from '../App';
import helper from '../services/tokenStore'
const CreditProvider = () => {
	useEffect(()=>{

		// function getCreditBalance() {
		// 	api.get(`/getusercreditbalance/?user_name=${helper.getUserName()}`)
		// 		.then((response) => {
		// 			//helper.setCreditBalance(response.data)
		// 			setCreditBalance(response.data)
		// 		})
		// 		.catch((err) => {});
		// }
		// getCreditBalance()
	},[])
	return (
	 <App /> 
	)
}

export default CreditProvider