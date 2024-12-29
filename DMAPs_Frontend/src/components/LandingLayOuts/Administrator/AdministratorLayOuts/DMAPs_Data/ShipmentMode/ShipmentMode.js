import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput } from 'mdb-react-ui-kit';
import { trackPromise } from 'react-promise-tracker';
import ShipmentModeTable from './ShipmentModeTable';
import ShipmentModeService from '../../../../../../services/ShipmentModeService';

export default function ShipmentMode() {
    const [ShipmentMode, setShipmentMode] = useState("");
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false); // To track edit mode
    const [currentShipmentMode, setCurrentShipmentMode] = useState(null); // Store data to be edited
    const [ShipmentModeData, setShipmentModeData] = useState([]);

    // Close modal and reset form
    const handleClose = () => {
        setShow(false);
        setEditMode(false);
        setCurrentShipmentMode(null);
        setShipmentMode("");
    };

    const handleForm = () => {
        setShow(true);
    };

    // Save or update ShipmentMode 
    const handleShipmentMode = () => {
        const payload = {
            id: currentShipmentMode?.id, // Include id if editing
            Shipment_Name : ShipmentMode,
        };

        const saveOrUpdate = editMode
            ? ShipmentModeService.updateShipmentMode({ data: [payload] })
            : ShipmentModeService.saveShipmentMode({ data: [payload] });

        trackPromise(
            saveOrUpdate
                .then(response => {
                    if (response.status === 200) {
                        getShipmentMode();
                        handleClose();
                    } else {
                        alert(response.data.result);
                    }
                })
                .catch(error => {
                    alert(error.response?.data?.error || error.message);
                })
        );
    };

    // Fetch ShipmentMode data
    const getShipmentMode = () => {
        trackPromise(
            ShipmentModeService.getShipmentMode().then(response => {
                console.log(response);
                setShipmentModeData(response.data.Shipment_Mode);
            })
        );
    };

    // Initialize ShipmentMode  data
    useEffect(() => {
        getShipmentMode();
    }, []);

    // Delete ShipmentMode  record
    const deleteShipmentModeRecord = (data) => {
        if (window.confirm("Are you sure to delete the ShipmentMode ?")) {
            const payload = { id: data.id };
            trackPromise(
                ShipmentModeService.deleteShipmentMode({ data: [payload] })
                    .then(response => {
                        if (response.status === 200) {
                            getShipmentMode();
                        } else {
                            alert(response.data.message);
                        }
                    })
                    .catch(error => {
                        alert(error.response?.data?.error || error.message);
                    })
            );
        }
    };

    // Open modal with data for editing
    const openEditForm = (data) => {
        setEditMode(true);
        setCurrentShipmentMode(data);
        setShipmentMode(data.Shipment_Name); // Pre-fill the field with existing data
        setShow(true);
    };

    return (
        <div>
            <div className='row'>
                <div className='col-8'>
                    <h1 className='h1'> Shipment Mode  </h1>
                </div>
                <div className='col-4 text-right'>
                    <Button className='primary-btn mt-10' onClick={handleForm}>
                        <i className='fa fa-plus fa-white'> </i> ShipmentMode 
                    </Button>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        dialogClassName="modal-50w"
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton style={{ color: 'white' }}>
                            <Modal.Title> {editMode ? "Edit ShipmentMode " : "Add New ShipmentMode "} </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={(e) => { e.preventDefault(); handleShipmentMode(); }}>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="mb-3">
                                            <MDBInput
                                                wrapperClass='mb-3'
                                                type='text'
                                                required
                                                label='ShipmentMode '
                                                tabIndex="3"
                                                onChange={(e) => setShipmentMode(e.target.value)}
                                                value={ShipmentMode}
                                                name='ShipmentMode'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} style={{ width: '15%' }}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleShipmentMode} style={{ width: '15%' }}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className='col-12'>
                    <ShipmentModeTable
                        data={ShipmentModeData}
                        deleteShipmentModeRecord={deleteShipmentModeRecord}
                        openEditForm={openEditForm} // Pass edit function to table
                    />
                </div>
            </div>
        </div>
    );
}
