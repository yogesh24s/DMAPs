import React from 'react';
import { useTable } from 'react-table';

export default function ProductTypeTable(props) {
    const { data } = props;
    
    const columns = React.useMemo(
        () => [
            {
                Header: 'Product Type',
                accessor: 'Product_Type',
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
                        >
                        </i>
                        <i
                            className='fa fa-trash ml-15 pointer'
                            onClick={() => props.deleteBuyerGroupRecord(row.original)}
                            title='Delete'
                        >
                        </i>
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
