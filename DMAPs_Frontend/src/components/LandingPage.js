/**
 * owner : retrAIver
 * author : Divyangi from Affine
 */

import {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.scss';
import helper from '../services/tokenStore';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import * as mdb from 'mdb-ui-kit'; // lib
import { Input } from 'mdb-ui-kit'; // module
import {
    MDBInput,
    MDBCheckbox,
    MDBBtn
  } from 'mdb-react-ui-kit';

import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBRow,
    MDBCol
  } from 'mdb-react-ui-kit';

export default function LandingPage(){
    const history =useHistory()
    
    const [basicActive, setBasicActive] = useState('tab1');

    const handleBasicClick = (value) => {
        if (value === basicActive) {
        return;
        }

        setBasicActive(value);
    };

    const [verticalActive, setVerticalActive] = useState('tab1');

    const handleVerticalClick = (value) => {
        if (value === verticalActive) {
        return;
        }

        setVerticalActive(value);
    };

    useEffect(()=>{
		
	},[])

    function openUseCaseModule(nameObj){
            history.push(nameObj.pathName);
    }

    return <>
    <div className="container-fluid" style={{padding : "2%"}}>
        <div className='row'>
            <div className='col-12'>
            <Tabs defaultActiveKey="second">
                <Tab eventKey="first" title="Home">
                    <span className='tad-content'>
                        Home Content
                    </span>
                </Tab>
                <Tab eventKey="second" title="Dashboard">
                <span className='tad-content'>
                Dashboard Content
                    </span>
                </Tab>
                <Tab eventKey="third" title="Administrator">
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

                    <MDBRow>
                        <MDBCol size='2'>
                        <MDBTabs className='flex-column text-center'>
                            <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleVerticalClick('tabV1')} active={verticalActive === 'tabV1'}>
                                Base Line
                            </MDBTabsLink>
                            </MDBTabsItem>
                            <MDBTabsItem>
                            </MDBTabsItem>
                        </MDBTabs>
                        </MDBCol>
                        <MDBCol size='9'>
                        <MDBTabsContent>
                            <MDBTabsPane show={verticalActive === 'tabV1'}>
                            <form>
                                <div className='row'>
                                    <div className='col-6'>
                                    <h5> Company Details </h5>
                                        <MDBRow className='mb-4'>
                                            <MDBCol>
                                                <MDBInput id='form6Example1' label='Name Of Unite' />
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBInput wrapperClass='mb-4' id='form6Example3' label='Short Name' />
                                        <MDBInput wrapperClass='mb-4' id='form6Example4' label='Group' />
                                        <MDBInput wrapperClass='mb-4' type='email' id='form6Example5' label='Division' />
                                        <MDBInput wrapperClass='mb-4' type='tel' id='form6Example6' label='Tin No' />
                                        <MDBInput wrapperClass='mb-4' type='tel' id='form6Example6' label='Reg No' />
                                    </div>

                                    <div className='col-6'>
                                    <h5> Contact Details </h5>
                                    <MDBRow className='mb-4'>
                                            <MDBCol>
                                                <MDBInput id='form6Example1' label='Address Line 1' />
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBInput wrapperClass='mb-4' id='form6Example3' label='Address Line 2' />
                                        <MDBInput wrapperClass='mb-4' id='form6Example4' label='Street / Area' />
                                        <MDBInput wrapperClass='mb-4' type='email' id='form6Example5' label='City' />
                                        <MDBInput wrapperClass='mb-4' type='tel' id='form6Example6' label='Tin' />
                                        <MDBInput wrapperClass='mb-4' type='tel' id='form6Example6' label='PIN No' />

                                        <MDBInput wrapperClass='mb-4' type='tel' id='form6Example6' label='Contact No' />
                                        <MDBInput wrapperClass='mb-4' type='tel' id='form6Example6' label='FAX No' />
                                        <MDBInput wrapperClass='mb-4' type='tel' id='form6Example6' label='MAIL Id' />
                                        <MDBInput wrapperClass='mb-4' type='tel' id='form6Example6' label='WebSite' />


                                        <MDBBtn className='mb-4' type='submit' block>
                                            Place order
                                        </MDBBtn>
                                    </div>
                                </div>
                                </form>

                                
                                
                                </MDBTabsPane>
                        </MDBTabsContent>
                        </MDBCol>
                    </MDBRow>

                    </MDBTabsPane>
                    <MDBTabsPane show={basicActive === 'tab2'}>Tab 2 content</MDBTabsPane>
                    <MDBTabsPane show={basicActive === 'tab3'}>Tab 3 content</MDBTabsPane>
                </MDBTabsContent>
                </Tab>
                <Tab eventKey="Four" title="Style Store">
                <span className='tad-content'>
                    Style Store Content
                    </span>
                </Tab>
                <Tab eventKey="Five" title="Fabric Store">
                <span className='tad-content'>
                    Fabric Store Content
                    </span>
                </Tab>
                <Tab eventKey="Six" title="Fabric Store">
                <span className='tad-content'>
                    Fabric Store Content
                    </span>
                </Tab>
                <Tab eventKey="Seven" title="Trim Stores">
                <span className='tad-content'>
                        Home Content
                    </span>
                </Tab>
                <Tab eventKey="Eight" title="Sewing Area">
                <span className='tad-content'>
                    Trim Stores Content
                    </span>
                </Tab>
                <Tab eventKey="Nine" title="Finishing Area">
                <span className='tad-content'>
                    Finishing Area Content
                    </span>
                </Tab>
            </Tabs>
            </div>
        </div>
    </div>
    </>
}