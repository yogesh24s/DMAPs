/**
 * owner : 
 * author :
 */

import {useEffect, useState} from 'react';
import './Administrator.scss';
import UnitSetUp from './AdministratorLayOuts/UnitSetUp';
import UserSetUp from './AdministratorLayOuts/UserSetUp';
import DataSetUp from './AdministratorLayOuts/DataSetUp';

import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
  } from 'mdb-react-ui-kit';

export default function Administrator(){

    const [basicActive, setBasicActive] = useState('tab1');
    const handleBasicClick = (value) => {
        if (value === basicActive) {
        return;
        }
        setBasicActive(value);
    };

    useEffect(()=>{
		
	},[])

    return <>
        <MDBTabs className='mb-3'>
            <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
                    Unit Set UP
                </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
                    User Set Up
                </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
                    Data Set Up
                </MDBTabsLink>
            </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
            <MDBTabsPane show={basicActive === 'tab1'}>
                <UnitSetUp />
            </MDBTabsPane>
            <MDBTabsPane show={basicActive === 'tab2'}>
                <UserSetUp />
            </MDBTabsPane>
            <MDBTabsPane show={basicActive === 'tab3'}>
                <DataSetUp />
            </MDBTabsPane>
        </MDBTabsContent>
    </>
}