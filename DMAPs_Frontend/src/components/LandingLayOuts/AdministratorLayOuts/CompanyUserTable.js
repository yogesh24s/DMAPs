import React from 'react'
import userService from "../../../services/userService";
import { trackPromise } from 'react-promise-tracker';
import { useState } from 'react';
import { useEffect } from 'react';
import { useTable } from 'react-table';

export default function CompanyUserTable(props) {
	//const [data, setData] = useState([])
    let data = props.data
	
	const columns = React.useMemo(
		() => [
		  
		  {
			Header: 'User Name',
			accessor: 'User_Name',
		  },
		  {
			Header: 'User Employee ID',
			accessor: 'User_Employee_Id',
		  },
		  {
			Header: 'Unit Name',
			accessor: 'Unit_Short_Name',
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
			Header: 'Contact NO.',
			accessor: 'Mobile_Num',
		  },
		  {
			Header: 'E-Mail',
			accessor: 'Mail_Id',
		  },
		  {
			Header: 'Role',
			accessor: 'User_Role',
		  },
		  {
			Header: 'Action',
			accessor: 'action', // You can set a dummy accessor for the action column
			Cell: ({ row }) => (
			  <button
				onClick={(data) => {
				  // Implement your edit record logic here
				  // You can use 'row.original' to access the user data
				  //console.log({"data":data});
				  props.openEditForm(row.original)
				  //console.log('Edit User:', row.original);
				}}
			  >
				Edit
			  </button>
			),
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
    <div className='mt-4'>
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
