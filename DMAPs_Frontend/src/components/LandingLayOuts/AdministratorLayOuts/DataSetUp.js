/**
 * owner : 
 * author :
 */

import {useEffect, useState} from 'react';
import './DataSetUp.scss';
import {
    MDBInput,
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

export default function DataSetUp(){

    const [verticalActive, setVerticalActive] = useState('tab1');
    const handleVerticalClick = (value) => {
        if (value === verticalActive) {
        return;
        }
        setVerticalActive(value);
    };

    useEffect(()=>{
		
	},[])

    return <>
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
                        <h5> Data Set Details </h5>
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
    </>
}