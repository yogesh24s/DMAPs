import React from 'react';
import { useTable } from 'react-table';

export default function WashingTypeTable(props) {
  const { data, openEditForm, deleteWashingRecord } = props;

  const columns = React.useMemo(
    () => [
      {
        Header: 'Washing Type',
        accessor: 'Washing_Type',
      },
      {
        Header: 'Actions',
        accessor: 'action', // Dummy accessor
        Cell: ({ row }) => (
          <div>
            <i
              className="fa fa-edit pointer"
              onClick={() => openEditForm(row.original)}
              title="Edit"
            >
              {' '}
            </i>
            <i
              className="fa fa-trash ml-15 pointer"
              onClick={() => deleteWashingRecord(row.original)}
              title="Delete"
            >
              {' '}
            </i>
          </div>
        ),
      },
    ],
    [openEditForm, deleteWashingRecord]
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
    <div className="mt-4">
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
