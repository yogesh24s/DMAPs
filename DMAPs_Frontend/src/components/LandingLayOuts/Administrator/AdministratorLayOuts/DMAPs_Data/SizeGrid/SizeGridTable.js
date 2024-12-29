import React from 'react';
import { useTable } from 'react-table';

export default function SizeGridTable({ data, openEditForm, deleteSizeGrid }) {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Size Grid Name',
                accessor: 'Size_Grid_Name',
            },
            {
                Header: 'Size Grid Value',
                accessor: 'Size_Grid_Value',
            },
            {
                Header: 'Actions',
                accessor: 'action',
                Cell: ({ row }) => (
                    <>
                        <i 
                            className='fa fa-edit pointer' 
                            onClick={() => openEditForm(row.original)} 
                            title='Edit' 
                        />  
                        <i 
                            className='fa fa-trash ml-15 pointer' 
                            onClick={() => deleteSizeGrid(row.original)} 
                            title='Delete' 
                        />
                    </>
                ),
            },
        ],
        [openEditForm, deleteSizeGrid] // Adding dependencies
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

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
