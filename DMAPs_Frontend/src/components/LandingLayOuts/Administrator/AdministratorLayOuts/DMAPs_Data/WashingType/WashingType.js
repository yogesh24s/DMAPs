import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput } from 'mdb-react-ui-kit';
import { trackPromise } from 'react-promise-tracker';
import WashingTypeTable from './WashingTypeTable';
import washingtypeService from '../../../../../../services/washingtypeService';

export default function WashingType() {
    const [washingType, setWashingType] = useState("");
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false); // To track edit mode
    const [currentWashingType, setCurrentWashingType] = useState(null); // Store data to be edited
    const [washingTypeData, setWashingTypeData] = useState([]);

    // Close modal and reset form
    const handleClose = () => {
        setShow(false);
        setEditMode(false);
        setCurrentWashingType(null);
        setWashingType("");
    };

    const handleForm = () => {
        setShow(true);
    };

    // Save or update washing type
    const handleWashingType = () => {
        const payload = {
            id: currentWashingType?.id, // Include id if editing
            washing_type: washingType,
        };

        const saveOrUpdate = editMode
            ? washingtypeService.updateWashingType({ data: [payload] })
            : washingtypeService.saveWashingType({ data: [payload] });

        trackPromise(
            saveOrUpdate
                .then(response => {
                    if (response.status === 200) {
                        getPrintType();
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

    // Fetch washing type data
    const getPrintType = () => {
        trackPromise(
            washingtypeService.getWashingType().then(response => {
                setWashingTypeData(response.data.washing_type);
            })
        );
    };

    // Initialize washing type data
    useEffect(() => {
        getPrintType();
    }, []);

    // Delete washing type record
    const deleteWashingRecord = (data) => {
        if (window.confirm("Are you sure to delete the Washing Type?")) {
            const payload = { id: data.id };
            trackPromise(
                washingtypeService.deleteWashingRecord({ data: [payload] })
                    .then(response => {
                        if (response.status === 200) {
                            getPrintType();
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
        setCurrentWashingType(data);
        setWashingType(data.Washing_Type); // Pre-fill the field with existing data
        setShow(true);
    };

    return (
        <div>
            <div className='row'>
                <div className='col-8'>
                    <h1 className='h1'> Washing Type </h1>
                </div>
                <div className='col-4 text-right'>
                    <Button className='primary-btn mt-10' onClick={handleForm}>
                        <i className='fa fa-plus fa-white'> </i> Washing Type
                    </Button>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        dialogClassName="modal-50w"
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton style={{ color: 'white' }}>
                            <Modal.Title> {editMode ? "Edit Washing Type" : "Add New Washing Type"} </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={(e) => { e.preventDefault(); handleWashingType(); }}>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="mb-3">
                                            <MDBInput
                                                wrapperClass='mb-3'
                                                type='text'
                                                required
                                                label='Washing Type'
                                                tabIndex="3"
                                                onChange={(e) => setWashingType(e.target.value)}
                                                value={washingType}
                                                name='washingType'
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
                            <Button variant="primary" onClick={handleWashingType} style={{ width: '15%' }}>
                            {editMode ? "Update" : "Save"}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className='col-12'>
                    <WashingTypeTable
                        data={washingTypeData}
                        deleteWashingRecord={deleteWashingRecord}
                        openEditForm={openEditForm} // Pass edit function to table
                    />
                </div>
            </div>
        </div>
    );
}
