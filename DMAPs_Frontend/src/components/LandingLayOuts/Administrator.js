/**
 * owner : 
 * author :
 */

import { useEffect, useState } from 'react';
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

export default function Administrator() {

    const [basicActive, setBasicActive] = useState('tab1');
    const handleBasicClick = (value) => {
        if (value === basicActive) {
            return;
        }
        setBasicActive(value);
    };

    useEffect(() => {

    }, [])

    return <>
        <MDBTabs className="admin-tab">
            <MDBTabsItem>
                <MDBTabsLink  onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
                    <i class="fa-solid fa-screwdriver-wrench"></i> Company Units
                </MDBTabsLink>
                
            </MDBTabsItem>
            <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
                    <i class="fa-solid fa-users"></i> Users
                </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
                    <i class="fa-solid fa-address-book"></i>  DMAPs Data
                </MDBTabsLink>

            </MDBTabsItem>
            
        </MDBTabs>

        <MDBTabsContent className='inner-tab-content'>
            <MDBTabsPane className="company-unit-tab" show={basicActive === 'tab1'}>
                <UnitSetUp />
            </MDBTabsPane>
            
            <MDBTabsPane className="user-tab" show={basicActive === 'tab2'}>
                <UserSetUp />
            </MDBTabsPane>
            <MDBTabsPane  className="data-tab" show={basicActive === 'tab3'}>
                <DataSetUp />
            </MDBTabsPane>
            
        </MDBTabsContent>
    </>
}