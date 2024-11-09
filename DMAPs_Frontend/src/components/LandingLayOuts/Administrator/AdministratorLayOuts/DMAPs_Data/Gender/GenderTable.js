import React from 'react';
import { useTable } from 'react-table';

export default function GenderTable(props) {
    // Log data to verify the structure
    const data = props.data || []; // Default to empty array if data is undefined

    console.log('Data received in GenderTable:', data);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Gender',
                accessor: 'Gender', // Adjust if 'gender' is the correct field name
            },
            {
                Header: 'Actions',
                accessor: 'action', // Dummy accessor for action column
                Cell: ({ row }) => (
					<>
					<i
						className="fa fa-edit pointer"
						onClick={() => props.openEditForm(row.original)}
						title="Edit"
					></i>
					<i
						className="fa fa-trash ml-15 pointer"
						onClick={() => props.deleteBuyerGroupRecord(row.original)}
						title="Delete"
					></i>
					</>
                ),
            },
        ],
		[props] // Ensure `props` dependencies are included

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
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
