/**
 * owner : Shree Nidhi
 * author :
 */

import {useEffect} from 'react';
import './LandingPage.scss';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import Administrator  from "./LandingLayOuts/Administrator/Administrator"
import StyleStore from "./LandingLayOuts/StyleStore/StyleStore"
export default function LandingPage(){   
     
    useEffect(()=>{
	},[])

return <>
    <div className="container-fluid">
        <div className='row'>
            <div className='col-12'>
            <Tabs defaultActiveKey="third">
                <Tab eventKey="first" title={<span> <i className="fa fa-home" /> Home </span>}>
                    Home Content
                </Tab>
                <Tab eventKey="second" title={<span> <i class="fa fa-table-columns"></i> Dashboard </span>}>
                    Dashboard Content
                </Tab>
                <Tab eventKey="third" className='admin-tab' title={<span> <i class="fa fa-toolbox"></i> Administrator </span>}>
                    <Administrator />
                </Tab>
                <Tab eventKey="Four" className='style-store-tab' title={<span> <i class="fa fa-store"></i> Style Store </span>}>
                    <StyleStore />
                </Tab>
                 {/*<Tab eventKey="Five" title={<span> <i class="fa fa-shop"></i> Fabric Store </span>}>
                    Fabric Store Content
                </Tab>
                <Tab eventKey="Six" title={<span> <i class="fa fa-store"></i> Cut Stores </span>}>
                    Cut Store Content
                </Tab>
                <Tab eventKey="Seven" title={<span> <i class="fa fa-store"></i> Trim Stores </span>}>
                    Trim Stores Content
                </Tab>
                <Tab eventKey="Eight" title={<span> <i class="fa fa-layer-group"></i> Sewing Area</span>}>
                    Sewing Area Content
                </Tab>
                <Tab eventKey="Nine" title={<span> <i class="fa fa-ballot-check"></i> Finishing Area</span>}>
                    Fininshing Area Content
                </Tab> */}
            </Tabs>
            </div>
        </div>
    </div>
    </>
}