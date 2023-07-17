import React, { useState, useEffect } from 'react';
import App from '../App';
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