import React from 'react';
import { useTable } from 'react-table';

export default function PODetailsTable(props) {
    const { data, openEditForm } = props;


    const columns = React.useMemo(
        () => [
            {
                Header: 'DMAPS No.',
                accessor: 'Style_No',
            },
            {
                Header: 'Order No.',
                accessor: 'PO_No',
                Cell: ({ row }) => (
                    <div
                        style={{ cursor: 'pointer', textAlign: 'center', fontWeight: '500', color:'#1053b7' }}
                        onClick={() => openEditForm(row.original)}
                    >
                        {row.values.PO_No}
                    </div>
                ),
            },
            {
                Header: (
                    <span title="Order Confirmation Number">
                        OC No.
                    </span>
                ),
                accessor: 'OC_No',
            },
            {
                Header: (
                    <span title="Embroidery Type">
                        Emb Type
                    </span>
                ),
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
                Header: (
                    <span title="Plan to Cut Date">
                        PCD
                    </span>
                ),
                accessor: 'PCD',
            },
            {
                Header: 'Action',
                accessor: 'action',
                Cell: ({ row }) => (
                    <>
                        <i className='fa fa-edit pointer' onClick={() => props.openEditForm(row.original)} title='Edit'> </i>
                        <i className='fa fa-trash ml-15 pointer' onClick={() => props.deletePODetails(row.original)} title='Delete'> </i>
                    </>
                ),
            },
        ],
        [props]
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

    // Helper function to calculate the row span and group index for Style_No
    const calculateRowSpansAndGroups = (data) => {
        const rowSpans = {};
        const rowGroups = {};
        let lastStyleNo = null;
        let spanCount = 0;
        let groupIndex = 0;

        data.forEach((row, index) => {
            const currentStyleNo = row.Style_No;

            if (currentStyleNo === lastStyleNo) {
                spanCount++;
            } else {
                if (lastStyleNo !== null) {
                    rowSpans[lastStyleNo] = spanCount;
                    rowGroups[lastStyleNo] = groupIndex;
                    groupIndex++;
                }
                lastStyleNo = currentStyleNo;
                spanCount = 1;
            }

            if (index === data.length - 1) {
                rowSpans[lastStyleNo] = spanCount;
                rowGroups[lastStyleNo] = groupIndex;
            }
        });

        return { rowSpans, rowGroups };
    };

    const { rowSpans, rowGroups } = calculateRowSpansAndGroups(data);

    // Function to determine if the row should be styled as odd or even
    const getRowClassName = (index, styleNo) => {
        const groupIndex = rowGroups[styleNo];
        return groupIndex % 2 === 0 ? 'row-even' : 'row-odd';
    };

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
                    {rows.map((row, i) => {
                        prepareRow(row);
                        const currentStyleNo = row.original.Style_No;
                        const previousStyleNo = i > 0 ? rows[i - 1].original.Style_No : null;
                        const rowClass = getRowClassName(i, currentStyleNo);

                        return (
                            <tr {...row.getRowProps()} className={rowClass}>
                                {row.cells.map((cell, cellIndex) => {
                                    if (cellIndex === 0) {
                                        if (i === 0 || currentStyleNo !== previousStyleNo) {
                                            return (
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }} {...cell.getCellProps()} rowSpan={rowSpans[currentStyleNo]}>
                                                    {cell.render('Cell')}
                                                </td>
                                            );
                                        } else {
                                            return null; // Skip the cell for merged rows
                                        }
                                    } else {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                    }
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
