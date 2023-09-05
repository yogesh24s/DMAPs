import React from 'react'
import unitService from "../../../services/unitService";
import { trackPromise } from 'react-promise-tracker';
import { useState } from 'react';
import { useEffect } from 'react';
import { useTable } from 'react-table';

export default function CompanyUnitTable() {
    const [data, setData] = useState([])
    const getCompanyUnitData = () => {
      trackPromise(
        unitService.getCompanyUnits().then((response) => {
          console.log(response.data[0].data[0].data.Company_Units)
          setData(response.data[0].data[0].data.Company_Units)
        })
      );
    }
	useEffect(() => {
		getCompanyUnitData()
	}, [])
	
	const columns = React.useMemo(
		() => [
		  {
			Header: 'Unit ID',
			accessor: 'Unit_Id',
		  },
		  {
			Header: 'Full Name',
			accessor: 'Unit_Full_Name',
		  },
		  {
			Header: 'Short Name',
			accessor: 'Unit_Short_Name',
		  },
		  {
			Header: 'TIN Number',
			accessor: 'Tin_Num',
		  },
		  {
			Header: 'Registration Number',
			accessor: 'Reg_Num',
		  },
		  {
			Header: 'Address Line 1',
			accessor: 'Address_Line_1',
		  },
		  {
			Header: 'Address Line 2',
			accessor: 'Address_Line_2',
		  },
		  {
			Header: 'Street',
			accessor: 'Street',
		  },
		  {
			Header: 'City',
			accessor: 'City',
		  },
		  {
			Header: 'State',
			accessor: 'State',
		  },
		  {
			Header: 'Pin Code',
			accessor: 'Pin_Code',
		  },
		  {
			Header: 'Contact Number',
			accessor: 'Contact_No',
		  },
		  {
			Header: 'Email',
			accessor: 'Email_Id',
		  },
		  {
			Header: 'Website',
			accessor: 'Website_Link',
		  },
		  {
			Header: 'Fax Number',
			accessor: 'Fax_No',
		  },
		],
		[]
	  );
		
	  const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	  } = useTable({
		columns,
		data,
	  });
	
  return (
    <div className='mt-5'>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

  )
}
