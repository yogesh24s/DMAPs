import React, { useState, useEffect } from "react";

import { TreeTable, TreeState } from 'cp-react-tree-table';
import './StyleDashboard.scss';

import styleStoreService from "../../../../services/styleStoreService";
import { trackPromise } from 'react-promise-tracker';

const MOCK_DATA = genData();

const StyleDashboard: React.FC = () => {
  const [treeValue, setTreeValue] = useState(TreeState.create(MOCK_DATA));
  const [data, setData] = useState([]);


  const handleOnChange = (newValue: any) => {
    setTreeValue(newValue);
  };

  const handleOnExpandAll = () => {
    setTreeValue(TreeState.expandAll(treeValue));
  };

  const handleOnCollapseAll = () => {
    setTreeValue(TreeState.collapseAll(treeValue));
  };

  const renderIndexCell = (row: any) => {
    return (
      <div style={{ paddingLeft: (row.metadata.depth * 15) + 'px' }}
        className={row.metadata.hasChildren ? 'with-children' : 'without-children'}>        
        {row.metadata.hasChildren &&
          <button className="toggle-button" onClick={row.toggleChildren}></button>}        
        <span>{row.data.name}</span>
      </div>
    );
  };

  const renderEmployeesCell = (row: any) => {
    return (
      <span className="employees-cell">{row.data.employees}</span>
    );
  };

  const renderExpensesCell = (row: any) => {
    return (
      <span className="expenses-cell">{row.data.expenses}</span>
    );
  };

  const renderEditableCell = (row: any) => {
    return (
      <input type="text" value={row.data.contact}
        onChange={(event) => {
          const newData = { ...row.data, contact: event.target.value };
          row.updateData(newData);
          handleOnChange(TreeState.create(MOCK_DATA)); // Update the state manually after editing
        }}/>
    );
  };

  const getStyleEntryData = () => {
		trackPromise(
			styleStoreService.getStyleEntry().then((response) => {
				setData(response.data.Style_Entry)
			})
		);
	}

	useEffect(() => {
		getStyleEntryData()
	}, [])

  return (
    <>
      {/* <div className="controls">
        <button onClick={handleOnExpandAll}>Expand all</button>
        <button onClick={handleOnCollapseAll}>Collapse all</button>
      </div>

      <TreeTable
        value={treeValue}
        onChange={handleOnChange}>
        <TreeTable.Column basis="180px" grow="0"
          renderCell={renderIndexCell}
          renderHeaderCell={() => <span>Name</span>}/>
        <TreeTable.Column
          renderCell={renderEditableCell}
          renderHeaderCell={() => <span>Contact person</span>}/>
        <TreeTable.Column
          renderCell={renderEmployeesCell}
          renderHeaderCell={() => <span className="t-right">Employees</span>}/>
        <TreeTable.Column
          renderCell={renderExpensesCell}
          renderHeaderCell={() => <span className="t-right">Expenses ($)</span>}/>
      </TreeTable> */}
    </>
  );
};

export default StyleDashboard;

function genData() {
	return [
    {
      data: { name: 'Company A', expenses: '60,000', employees: '5', contact: 'Nicholas Watson' },
      height: 32,
    },
    {
      data: { name: 'Company I', expenses: '105,000', employees: '22', contact: 'Makenzie Higgs' },
      children: [
        {
          data: { name: 'Department 1', expenses: '75,000', employees: '18', contact: 'Florence Carter' },
          children: [
            {
              data: { name: 'Group alpha', expenses: '25,000', employees: '8', contact: 'Doug Moss' },
            },
            {
              data: { name: 'Group beta', expenses: '10,000', employees: '6', contact: 'Camila Devonport' },
            },
            {
              data: { name: 'Group gamma', expenses: '40,000', employees: '4', contact: 'Violet Curtis' },
            }
          ],
        },
        {
          data: { name: 'Department 2', expenses: '30,000', employees: '4', contact: 'Selena Rycroft' },
          height: 32,
        }
      ],
    },
    {
      data: { name: 'Company B', expenses: '70,000', employees: '5', contact: 'Dani Hopkinson' },
      height: 32,
    },
    {
      data: { name: 'Company C', expenses: '50,000', employees: '4', contact: 'Jacob Ellery' },
      height: 32,
    },
    {
      data: { name: 'Company D', expenses: '230,000', employees: '9', contact: 'Kate Stewart' },
      height: 32,
    },
    {
      data: { name: 'Company E', expenses: '310,000', employees: '8', contact: 'Louise Fall' },
      height: 32,
    },
    {
      data: { name: 'Company F', expenses: '110,000', employees: '5', contact: 'Owen Thompson' },
      height: 32,
    }, 
    {
      data: { name: 'Company G', expenses: '250,000', employees: '18', contact: 'Fred Wilton' },
      height: 32,
    },
    {
      data: { name: 'Company H', expenses: '180,000', employees: '7', contact: 'William Dallas' },
      height: 32,
    },
    {
      data: { name: 'Company J', expenses: '370,000', employees: '13', contact: 'Ron Douglas' },
      height: 32,
    },
    {
      data: { name: 'Company K', expenses: '500,000', employees: '15', contact: 'Michael Jacobs' },
      height: 32,
    },
    {
      data: { name: 'Company L', expenses: '230,000', employees: '10', contact: 'Stephanie Egerton' },
      height: 32,
    },
    {
      data: { name: 'Company M', expenses: '90,000', employees: '25', contact: 'Michael Buckley' },
      height: 32,
    },
    {
      data: { name: 'Company N', expenses: '370,000', employees: '13', contact: 'Sabrina Rowlands' },
      height: 32,
    },
    {
      data: { name: 'Company O', expenses: '500,000', employees: '15', contact: 'Lana Watt' },
      height: 32,
    },
    {
      data: { name: 'Company P', expenses: '230,000', employees: '10', contact: 'Evelynn Calderwood' },
      height: 32,
    },
    {
      data: { name: 'Company Q', expenses: '90,000', employees: '25', contact: 'Jade Morley' },
      height: 32,
    }, 
  ];
}
