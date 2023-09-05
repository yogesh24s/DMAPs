import React from 'react'
import userService from "../../../services/userService";
import { trackPromise } from 'react-promise-tracker';
import { useState } from 'react';
import { useEffect } from 'react';
import { useTable } from 'react-table';

export default function CompanyUserTable() {
	const [data, setData] = useState([])
    const getCompanyUserData = () => {
      trackPromise(
        userService.getCompanyUsers().then((response) => {
          console.log(response.data)
          setData(response.data)
        })
      );
    }
	useEffect(() => {
		getCompanyUserData()
	}, [])
	
	const columns = React.useMemo(
		() => [
		  {
			Header: 'Unit Name',
			accessor: 'Unit_Short_Name',
		  },
		  {
			Header: 'User Name',
			accessor: 'User_Name',
		  },
		  {
			Header: 'Short Name',
			accessor: 'Short_Name',
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
