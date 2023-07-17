/**
 * owner : 
 * author :
 */

import {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.scss';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import Administrator  from './LandingLayOuts/Administrator';

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
                <Tab eventKey="third" title={<span> <i class="fa fa-toolbox"></i> Administrator </span>}>
                    <Administrator />
                </Tab>
                <Tab eventKey="Four" title={<span> <i class="fa fa-store"></i> Style Store </span>}>
                    Style Store Content
                </Tab>
                <Tab eventKey="Five" title={<span> <i class="fa fa-shop"></i> Fabric Store </span>}>
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
                </Tab>
            </Tabs>
            </div>
        </div>
    </div>
    </>
}