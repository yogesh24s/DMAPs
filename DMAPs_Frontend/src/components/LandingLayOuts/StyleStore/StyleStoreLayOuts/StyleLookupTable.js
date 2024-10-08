import React from 'react';
import { useTable } from 'react-table';
import moment from 'moment';

export default function StyleLookupTable(props) {
    const data = props.data;

    const columns = React.useMemo(
        () => [
            {
                Header: 'Images',
                accessor: 'Style_Images',
                Cell: ({ row }) => {
                    const firstImage = JSON.parse(row.original.Style_Images)[0];
                    return (
                        <div>
                            <img
                                src={firstImage}
                                alt="First Thumbnail"
                                style={{ width: '25px', height: '25px', marginRight: '5px' }}
                            />
                        </div>
                    );
                },
            },
            {
                Header: 'Buyer',
                accessor: 'Buyer_Name',
            },
            {
                Header: 'Style No.',
                accessor: 'Style_No',
            },
            {
                Header: 'Description',
                accessor: 'Style_Description',
            },
            {
                Header: 'Product Type',
                accessor: 'Product_Type',
            },
            {
                Header: 'Gender',
                accessor: 'Gender',
            },
            {
                Header: 'PO No',
                accessor: 'PO_No',
            },
            // New columns for color and order quantity
			{
				Header: 'Color',
				accessor: row => {
					if (row && row.Garment_Data) {
						const garmentData = JSON.parse(row.Garment_Data);
						if (garmentData.length > 0) {
							return garmentData.map((color, index) => (
								<ul key={index} className='ul-table'>
									<li style={{ border: '0px solid #d1cece', textAlign: 'center' }}>

                                        <div style={{
													backgroundColor: color.garmentColor,
													width: '25px',
													height: '25px',
													borderRadius: '4px',
													border: '1px solid #ccc',
												}}
                                            ></div>
                                    </li>
								</ul>
							));
						}
					}
					return ''; // Return an empty string if Garment_Data is undefined, null, or empty
				},
			},
			{
				Header: 'Order Qty',
				accessor: row => {
					if (row && row.Garment_Data) {
						const garmentData = JSON.parse(row.Garment_Data);
						if (garmentData.length > 0) {
							return garmentData.map((qty, index) => (
								<ul key={index} className='ul-table'>
									<li style={{ border: '1px solid #d1cece', textAlign: 'center'}}>{qty.total}</li>
								</ul>
							));
						}
					}
					return ''; // Return an empty string if Garment_Data is undefined, null, or empty
				},
			},
            {
                Header: 'Total',
                accessor: (row) => {
                    if (row && row.Garment_Data) {
                        const garmentData = JSON.parse(row.Garment_Data);
                        if (garmentData.length > 0) {
                            // Calculate the total quantity for each style
                            let totalQty = 0;
                            garmentData.forEach((garment) => {
                                totalQty += parseInt(garment.total);
                            });
                            return totalQty;
                        }
                    }
                    return ''; // Return an empty string if Garment_Data is undefined, null, or empty
                },
            },
            {
                Header: 'Delivery Date',
                accessor: 'Delivery_Date',
                Cell: ({ value }) => value ? moment(value).format('DD/MM/YYYY') : 'N/A',
            },
            {
                Header: 'Merchant Name',
                accessor: 'Marchent_Name',
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
        <div className='mt-4'>
            <table {...getTableProps()} className="table table-lookup striped" striped>
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
    );
}
