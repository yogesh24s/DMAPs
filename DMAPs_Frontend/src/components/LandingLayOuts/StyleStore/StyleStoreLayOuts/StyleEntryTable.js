import React from 'react';
import { useTable } from 'react-table';
import PropTypes from 'prop-types';

export default function StyleEntryTable(props) {
    const { data, openEditForm, deleteStyleEntry } = props;

    const columns = React.useMemo(
        () => [
            {
                Header: 'DMAPS No.',
                accessor: 'Style_No',
                Cell: ({ row }) => (
                    <div
                        style={{ cursor: 'pointer', textAlign: 'center', fontWeight: '500', color:'#1053b7' }}
                        onClick={() => openEditForm(row.original)}
                    >
                        {row.values.Style_No}
                    </div>
                ),
            },
            {
                Header: 'Buyer',
                accessor: 'Buyer_Name',
            },
            {
                Header: 'Buyer Style No.',
                accessor: 'Style_Description',
            },
            {
                Header: 'Size Grid Name',
                accessor: 'Size_Grid_Name',
            },
            {
                Header: 'Product Type',
                accessor: 'Product_Type',
            },
            {
                Header: 'Merchant Name',
                accessor: 'Marchent_Name',
            },
            {
                Header: 'Merchant Contact',
                accessor: 'Marchent_Contact',
            },
            {
                Header: 'Images',
                accessor: 'Style_Images',
                Cell: ({ row }) => {
                    const images = JSON.parse(row.original.Style_Images);
                    return (
                        <div>
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Thumbnail ${index}`}
                                    style={{ width: '25px', height: '25px', marginRight: '5px' }}
                                />
                            ))}
                        </div>
                    );
                },
            },
            {
                Header: 'Action',
                accessor: 'action',
                Cell: ({ row }) => (
                    <>
                        <i
                            className='fa fa-edit pointer'
                            onClick={() => openEditForm(row.original)}
                            title='Edit'
                        ></i>
                        <i
                            className='fa fa-trash ml-15 pointer'
                            onClick={() => deleteStyleEntry(row.original)}
                            title='Delete'
                        ></i>
                    </>
                ),
            },
        ],
        [openEditForm, deleteStyleEntry]
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
            <table {...getTableProps()} className="table striped">
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

StyleEntryTable.propTypes = {
    data: PropTypes.array.isRequired,
    openEditForm: PropTypes.func.isRequired,
    deleteStyleEntry: PropTypes.func.isRequired,
};
