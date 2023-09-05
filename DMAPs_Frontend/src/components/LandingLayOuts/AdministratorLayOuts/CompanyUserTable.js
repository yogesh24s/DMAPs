import React from 'react';

import { useState, useEffect } from 'react';
import userService from "../../../services/userService";
import { trackPromise } from 'react-promise-tracker';
import { useTable } from 'react-table';

export default function CompanyUserTable() {
	const [data, setData] = useState([])

    const getCompanyUserData = () => {
      trackPromise(
        userService.getCompanyUsers().then((response) => {
          setData(response.data.Company_Users)
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
			Header: 'Department',
			accessor: 'Department_Id',
		  },
		  {
			Header: 'Designation',
			accessor: 'Designation_Id',
		  },
		  {
			Header: 'Mobile Number',
			accessor: 'Mobile_Num',
		  },
		  {
			Header: 'EMail',
			accessor: 'Mail_Id',
		  },
		  {
			Header: 'User Role',
			accessor: 'User_Role',
		  }
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