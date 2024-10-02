import React from 'react'
import unitService from "../../../../services/unitService"
import { trackPromise } from 'react-promise-tracker';
import { useState } from 'react';
import { useEffect } from 'react';
import { useTable } from 'react-table';

export default function CompanyUnitTable(props) {
    //const [data, setData] = useState([]);
    let data = props.data
	const columns = React.useMemo(
		() => [
		  {
			Header: 'Full Name',
			accessor: 'Unit_Full_Name',
		  },
		  {
			Header: 'Short Name',
			accessor: 'Unit_Short_Name',
		  },
		  {
			Header: 'Registration No.',
			accessor: 'Reg_Num',
		  },
		  {
			Header: 'Address',
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
			Header: 'Pincode',
			accessor: 'Pin_Code',
		  },
		  {
			Header: 'Contact No.',
			accessor: 'Contact_No',
		  },
		  {
			Header: 'E-mail ID',
			accessor: 'Email_Id',
		  },
		  {
			Header: 'Actions',
			accessor: 'action', // You can set a dummy accessor for the action column
			Cell: ({ row }) => ([
				<i className='fa fa-edit pointer' onClick={(data) => {
				  props.openEditForm(row.original)
				}} title='Edit'> </i>,  <i className='fa fa-trash ml-15 pointer' onClick={(data) => {
					props.deleteUnitRecord(row.original)
				  }} title='Delete' > </i>]
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
      <table {...getTableProps()} className="table striped" striped>
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
