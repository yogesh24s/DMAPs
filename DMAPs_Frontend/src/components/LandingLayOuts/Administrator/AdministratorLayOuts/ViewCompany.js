import React, { useEffect, useState } from 'react'
import { trackPromise } from "react-promise-tracker";
import unitService from "../../../../services/unitService";
export default function ViewCompany() {
    const [tableData, setTableData] = useState([])

    const getCompanySetup =() =>{
        trackPromise(
			unitService.getCompanyUnits().then((response) => {
				if (response.data) {
					setTableData(response.data);
				}
			})
		);
    }
    useEffect(() => {
        getCompanySetup() 
    }, [])
    
    
    
    
  return (
    <div>
        <h1>Hello</h1>
    </div>
  )
}
