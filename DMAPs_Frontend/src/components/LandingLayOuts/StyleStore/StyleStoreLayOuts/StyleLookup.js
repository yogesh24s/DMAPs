/**
 * owner : 
 * author :
 */

import { useEffect, useState } from 'react';

import './StyleLookup.scss';


import styleStoreService from "../../../../services/styleStoreService";
import { trackPromise } from 'react-promise-tracker';
import StyleLookupTable from './StyleLookupTable';

export default function StyleLookup() {

	const [data, setData] = useState([]);
	
	const getStyleLookupData = () => {
		trackPromise(
			styleStoreService.getStyleLookupDetails().then((response) => {
				setData(response.data.Style_Lookup)
			})
		);
	}


	useEffect(() => {
		getStyleLookupData()
	}, [])


	return <>
			 <StyleLookupTable defaultPageSize={10} data={data} />
	</>
}