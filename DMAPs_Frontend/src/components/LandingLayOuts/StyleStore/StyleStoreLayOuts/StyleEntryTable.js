import React from 'react'
import { useTable } from 'react-table';

export default function StyleEntryTable(props) {
    //const [data, setData] = useState([]);
    let data = props.data
	const columns = React.useMemo(
		() => [
		  {
			Header: 'Buyer',
			accessor: 'Buyer_Group_Name',
		  },
		  {
			Header: 'Style No.',
			accessor: 'Style_No',
		  },
		  {
			Header: 'Style Description',
			accessor: 'Style_Description',
		  },
		  {
			Header: 'Size Grid',
			accessor: 'Size_Grid',
		  },
		  {
			Header: 'Product Type',
			accessor: 'Product_Type',
		  },
		  {
			Header: 'Marchent Name',
			accessor: 'Marchent_Name',
		  },
		  {
			Header: 'Note',
			accessor: 'Note',
		  },
		  {
			Header: 'Action',
			accessor: 'action', // You can set a dummy accessor for the action column
			Cell: ({ row }) => ([
				<i className='fa fa-edit pointer' onClick={(data) => {
				  props.openEditForm(row.original)
				}} title='Edit'> </i>,  <i className='fa fa-trash ml-15 pointer' onClick={(data) => {
					props.deleteStyleEntry(row.original)
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
