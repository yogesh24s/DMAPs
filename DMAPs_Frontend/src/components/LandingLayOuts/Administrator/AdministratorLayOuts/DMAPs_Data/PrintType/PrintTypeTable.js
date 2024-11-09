import React from 'react';
import { useTable } from 'react-table';

export default function PrintTypeTable(props) {
    const data = props.data;

    const columns = React.useMemo(
        () => [
            {
                Header: 'Print Type',
                accessor: 'Print_Type', // Ensure this matches the API response
            },
            {
                Header: 'Actions',
                accessor: 'action',
                Cell: ({ row }) => (
                    <>
                        <i
                            className='fa fa-edit pointer'
                            onClick={() => props.openEditForm(row.original)}
                            title='Edit'
                        ></i>
                        <i
                            className='fa fa-trash ml-15 pointer'
                            onClick={() => props.deletePrintType(row.original)}
                            title='Delete'
                        ></i>
                    </>
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
