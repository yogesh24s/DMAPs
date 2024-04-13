/**
 * owner : 
 * author :
 */

import { useEffect, useState } from 'react';
import './StyleStore.scss';

import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBRow
} from 'mdb-react-ui-kit';

import StyleEntry from './StyleStoreLayOuts/StyleEntry';

export default function StyleStore() {

    const [basicActive, setBasicActive] = useState('tab3');
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
                    <i class="fa-solid fa-screwdriver-wrench"></i> Style Dashboard
                </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
                <MDBTabsLink  onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
                    <i class="fa-solid fa-screwdriver-wrench"></i> Style LookUp
                </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
                <MDBTabsLink  onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
                    <i class="fa-solid fa-screwdriver-wrench"></i> Style Entry
                </MDBTabsLink>
            </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent className='inner-tab-content'>
            <MDBTabsPane className="style-entry-tab" show={basicActive === 'tab1'}>
                <MDBRow>
                    
                </MDBRow>
            </MDBTabsPane>
            <MDBTabsPane className="style-lookup-tab" show={basicActive === 'tab2'}>
                <MDBRow>
                    
                </MDBRow>
            </MDBTabsPane>
            <MDBTabsPane className="style-dashboard-tab" show={basicActive === 'tab3'}>
                <MDBRow>
                    <StyleEntry />
                </MDBRow>
            </MDBTabsPane>
        </MDBTabsContent>
    </>
}