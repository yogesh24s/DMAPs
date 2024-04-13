import React from 'react'
import { useTable } from 'react-table';

export default function PODetailsTable(props) {
    //const [data, setData] = useState([]);
    let data = props.data
	const columns = React.useMemo(
		() => [
		  {
			Header: 'Style No',
			accessor: 'Style_No',
		  },
		  {
			Header: 'PO No.',
			accessor: 'PO_No',
		  },
		  {
			Header: 'OC No',
			accessor: 'OC_No',
		  },
		  {
			Header: 'Emb Type',
			accessor: 'Emb_Type',
		  },
		  {
			Header: 'Print Type',
			accessor: 'Print_Type',
		  },
		  {
			Header: 'Washing Type',
			accessor: 'Washing_Type',
		  },
		  {
			Header: 'Shipment Mode',
			accessor: 'Shipment_Mode',
		  },
		  {
			Header: 'Delivery Date',
			accessor: 'Delivery_Date',
		  },
		  {
			Header: 'PCD',
			accessor: 'PCD',
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
					props.deletePODetails(row.original)
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
