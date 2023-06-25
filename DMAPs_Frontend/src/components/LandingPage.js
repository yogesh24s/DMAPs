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
            <Tabs defaultActiveKey="second">
                <Tab eventKey="first" title="Home">
                    Home Content
                </Tab>
                <Tab eventKey="second" title="Dashboard">
                    Dashboard Content
                </Tab>
                <Tab eventKey="third" title="Administrator">
                    <Administrator />
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