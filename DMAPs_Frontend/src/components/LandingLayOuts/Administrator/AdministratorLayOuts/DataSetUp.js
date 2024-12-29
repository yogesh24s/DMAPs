/**
 * owner : 
 * author :
 */

import { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import BuyerGroup from './DMAPs_Data/BuyerGroup';

import './DataSetUp.scss';

import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBRow,
    MDBCol,
    MDBInput
} from 'mdb-react-ui-kit';


// import userService from "../../../services/userService";
import { trackPromise } from 'react-promise-tracker';
import Gender from './DMAPs_Data/Gender/Gender';
import ProductType from './DMAPs_Data/ProductType/ProductType';
import Season from './DMAPs_Data/SEASON/Season';
import SizeGrid from './DMAPs_Data/SizeGrid/SizeGrid';
import PrintType from './DMAPs_Data/PrintType/PrintType';
import WashingType from './DMAPs_Data/WashingType/WashingType';
import EmbType from './DMAPs_Data/EmbType/EmbType';
import ShipmentMode from './DMAPs_Data/ShipmentMode/ShipmentMode'
import Country from './DMAPs_Data/Country/County'
import Color from './DMAPs_Data/Color/Color'

export default function DataSetUp() {
    const [verticalActive, setVerticalActive] = useState('tabV3');
    const [unitName, setunitName] = useState('')
    const [shortName, setShortName] = useState('')
    const [group, setGroup] = useState('')
    const [division, setdivision] = useState('')
    const [tinNo, setTinNo] = useState('')
    const [regNo, setRegNo] = useState('')
    const [addressLine1, setAddressLine1] = useState('')
    const [addressLine2, setAddressLine2] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [pinNo, setPinNO] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [contactNoRec, setContactNoRec] = useState('')
    const [faxNo, setFaxNo] = useState('')
    const [mailId, setMailId] = useState('')
    const [website, setWebsite] = useState('')
    const [state, setState] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleUnitSetup = (e) => {
        e.preventDefault();

        console.log('hello');
    }
    
    const handleVerticalClick = (value) => {
        if (value === verticalActive) {
            return;
        }
        setVerticalActive(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let payload = {
            "Unit_Full_Name": unitName,
            "Unit_Short_Name": shortName,
            "Group_Id": group,
            "Division_Id": division,
            "Tin_Num": tinNo,
            "Reg_Num": regNo,
            "Address_Line_1": addressLine1,
            "Address_Line_2": addressLine2,
            "Street": street,
            "City": city,
            "State": state,
            "Pin_Code": pinNo,
            "Contact_No": contactNo,
            "Contact_No_Rec" : contactNoRec,
            "Email_Id": mailId,
            "Website_Link": website,
            "Fax_No": faxNo


        }
        alert('suceess')
        // trackPromise(unitService.saveCompanyUnits(payload).then((response) => {
        //     //check login response
        //     if (response.data.status == 'Success') {
        //         alert(response.data.message);

        //     }
        //     else if (response.data.status == 'Failed') {
        //         alert(response.data.message);
        //     }

        // }).catch((error) => {
        //     //console.log(error.response.data.error)
        //     alert(error.response.data.error);
        // })
        // );


    }
 
    useEffect(() => {

    }, [])

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 10,
        lastPageText: ">>",
        firstPageText: "<<",
        nextPageText: ">",
        prePageText: "<",
        showTotal: true,
        alwaysShowAllBtns: true,
        hideSizePerPage: true,
        onPageChange: function (page, sizePerPage) { },
        onSizePerPageChange: function (page, sizePerPage) { },
    });
    const iconActionHandler = (cell, row, rowIndex) => {
        return (
            <>
                <i className="fas fa-edit action-icon" title="Edit" > </i>
            </>
        );
    };

    const products = [
        {
            id: 1,
            Buyer_Group: "Mexx",
            Buyer: "Mexx Kids ware",
            Address: "63-D, Basant Lok Community Centre, Vasant Vihar, New Delhi 110057",
            Action: ""
        },
        {
            id: 2,
            Buyer_Group: "Mexx",
            Buyer: "Mexx Sports ware",
            Address: "63-D, Basant Lok Community Centre, Vasant Vihar, New Delhi 110057",
            Action: ""
        },
        {
            id: 3,
            Buyer_Group: "Levis",
            Buyer: "Levi's - Men's Wear",
            Address: "001A & 002A, The Grand Sigma Mall, Ground Floor, Near-Wockhardt Hospital, Cunningham Road, Bengaluru, Karnataka 560052",
            Action: ""
        }
    ];
    const columns = [{
        dataField: 'id',
        text: 'No',
        sort: true
    }, {
        dataField: 'Buyer_Group',
        text: 'Buyer Group'
    }, {
        dataField: 'Buyer',
        text: 'Buyer',
        sort: true
    },
    {
        dataField: 'Address',
        text: 'Address',
        sort: true
    },
    {
        dataField: "Action",
        text: "Action",
        formatter: iconActionHandler,
        sort: false,
        classes: "actions-column"
    }
    ];

    return <>
        <MDBRow>
            <MDBCol size='1' style={{ width : "13%" }} className='no-pad-right'>
                <MDBTabs className='flex-column text-center vertical-tab'>

                    {/* <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV1')} active={verticalActive === 'tabV1'}>
                            Human Resources
                        </MDBTabsLink>
                    </MDBTabsItem> */}
                    
                    {/* <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV2')} active={verticalActive === 'tabV2'}>
                            Administrator
                        </MDBTabsLink>
                    </MDBTabsItem> */}

                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV3')} active={verticalActive === 'tabV3'}>
                            Buyer
                        </MDBTabsLink>
                    </MDBTabsItem>
                    
                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV4')} active={verticalActive === 'tabV4'}>
                            Style Description
                        </MDBTabsLink>
                    </MDBTabsItem>
                    
                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV5')} active={verticalActive === 'tabV5'}>
                           Style Gender
                        </MDBTabsLink>
                    </MDBTabsItem>
                    
                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV6')} active={verticalActive === 'tabV6'}>
                            Season
                        </MDBTabsLink>
                    </MDBTabsItem>
                    
                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV7')} active={verticalActive === 'tabV7'}>
                            Size Grid
                        </MDBTabsLink>
                    </MDBTabsItem>
                    
                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV8')} active={verticalActive === 'tabV8'}>
                            Embrodiery
                        </MDBTabsLink>
                    </MDBTabsItem>
                    
                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV9')} active={verticalActive === 'tabV9'}>
                            Print
                        </MDBTabsLink>
                    </MDBTabsItem>
                    
                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV10')} active={verticalActive === 'tabV10'}>
                            Washing
                        </MDBTabsLink>
                    </MDBTabsItem>
                    
                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV11')} active={verticalActive === 'tabV11'}>
                            Shipment Mode
                        </MDBTabsLink>
                    </MDBTabsItem> 
                    
                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV12')} active={verticalActive === 'tabV12'}>
                            Country
                        </MDBTabsLink>
                    </MDBTabsItem>
                    
                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV13')} active={verticalActive === 'tabV13'}>
                            Garment Colour
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>
            </MDBCol>
            <MDBCol size='11' style={{ width : "87%" }} className='no-pad-left'>
                <MDBTabsContent className='unit-tab-content'>
                    <MDBTabsPane show={verticalActive === 'tabV1'}>

                    </MDBTabsPane>
                    <MDBTabsPane show={verticalActive === 'tabV2'}>

                    </MDBTabsPane>
                    <MDBTabsPane show={verticalActive === 'tabV3'}>
                        <BuyerGroup></BuyerGroup>
                    </MDBTabsPane>
                    <MDBTabsPane show={verticalActive === 'tabV4'}>
                        <ProductType></ProductType>
                    </MDBTabsPane>
                    <MDBTabsPane show={verticalActive === 'tabV5'}>
                        <Gender></Gender>
                    </MDBTabsPane>
                    <MDBTabsPane show={verticalActive === 'tabV6'}>
                        <Season></Season>
                    </MDBTabsPane>
                    <MDBTabsPane show={verticalActive === 'tabV7'}>
                        <SizeGrid></SizeGrid>
                    </MDBTabsPane>
                    <MDBTabsPane show={verticalActive === 'tabV9'}>
                        <PrintType></PrintType>
                    </MDBTabsPane>
                    <MDBTabsPane show={verticalActive === 'tabV10'}>
                        <WashingType></WashingType>
                    </MDBTabsPane>
                    <MDBTabsPane show={verticalActive === 'tabV8'}>
                        <EmbType></EmbType>
                    </MDBTabsPane>
                    <MDBTabsPane show={verticalActive === 'tabV11'}>
                        <ShipmentMode></ShipmentMode>
                    </MDBTabsPane>
                    <MDBTabsPane show={verticalActive === 'tabV12'}>
                        <Country> </Country>
                    </MDBTabsPane>
                    <MDBTabsPane show={verticalActive === 'tabV13'}>
                        <Color> </Color>
                    </MDBTabsPane>
                </MDBTabsContent>
            </MDBCol>
        </MDBRow>
    </>
}