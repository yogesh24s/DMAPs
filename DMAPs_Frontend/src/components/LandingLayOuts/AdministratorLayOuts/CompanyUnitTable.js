import React from 'react'
import unitService from "../../../services/unitService";
import { trackPromise } from 'react-promise-tracker';
import { useState } from 'react';
import { useEffect } from 'react';
import { useTable } from 'react-table';

export default function CompanyUnitTable(props) {
    //const [data, setData] = useState([]);
    let data = props.data
	
	console.log({"data":data});
	const columns = React.useMemo(
		() => [
		  {
			Header: 'ID',
			accessor: 'Unit_Id',
		  },
		  {
			Header: 'Full Name',
			accessor: 'Unit_Full_Name',
		  },
		  {
			Header: 'Unit Short Name',
			accessor: 'Unit_Short_Name',
		  },
		  {
			Header: 'Registration Number',
			accessor: 'Reg_Num',
		  },
		  {
			Header: 'Address Line',
			accessor: 'Address_Line_1',
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
			Header: 'Action',
			accessor: 'action', // You can set a dummy accessor for the action column
			Cell: ({ row }) => (
			  <button
				onClick={(data) => {
				  // Implement your edit record logic here
				  // You can use 'row.original' to access the user data
				  console.log({"data":data});

				  props.openEditForm(row.original)
				  console.log('Edit User:', row.original);
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
