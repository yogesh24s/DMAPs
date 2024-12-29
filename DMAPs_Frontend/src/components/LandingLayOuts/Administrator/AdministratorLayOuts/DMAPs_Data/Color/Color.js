import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput } from 'mdb-react-ui-kit';
import { trackPromise } from 'react-promise-tracker';
import ColorTable from './ColorTable';
import ColorService from '../../../../../../services/ColorService';

export default function Color() {
    const [Color, setColor] = useState("");
    const [ColorCode, setColorCode] = useState("");
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false); // To track edit mode
    const [currentColor, setCurrentColor] = useState(null); // Store data to be edited
    const [ColorData, setColorData] = useState([]);

    // Close modal and reset form
    const handleClose = () => {
        setShow(false);
        setEditMode(false);
        setCurrentColor(null);
        setColor("");
        setColorCode("");
    };

    const handleForm = () => {
        setShow(true);
    };

    // Save or update Color 
    const handleColor = () => {
        const payload = {
            id: currentColor?.id, // Include id if editing
            Color_Name : Color,
            Color_Code : ColorCode
        };

        const saveOrUpdate = editMode
            ? ColorService.updateColor({ data: [payload] })
            : ColorService.saveColor({ data: [payload] });

        trackPromise(
            saveOrUpdate
                .then(response => {
                    if (response.status === 200) {
                        getColor();
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

    // Fetch Color data
    const getColor = () => {
        trackPromise(
            ColorService.getColor().then(response => {
                setColorData(response.data.Color);
            })
        );
    };

    // Initialize Color  data
    useEffect(() => {
        getColor();
    }, []);

    // Delete Color  record
    const deleteColorRecord = (data) => {
        if (window.confirm("Are you sure to delete the Color ?")) {
            const payload = { id: data.id };
            trackPromise(
                ColorService.deleteColor({ data: [payload] })
                    .then(response => {
                        if (response.status === 200) {
                            getColor();
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
        setCurrentColor(data);
        setColor(data.Color_Name); // Pre-fill the field with existing data
        setColorCode(data.Color_Code);
        setShow(true);
    };

    return (
        <div>
            <div className='row'>
                <div className='col-8'>
                    <h1 className='h1'> Color  </h1>
                </div>
                <div className='col-4 text-right'>
                    <Button className='primary-btn mt-10' onClick={handleForm}>
                        <i className='fa fa-plus fa-white'> </i> Color 
                    </Button>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        dialogClassName="modal-50w"
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton style={{ color: 'white' }}>
                            <Modal.Title> {editMode ? "Edit Color " : "Add New Color "} </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={(e) => { e.preventDefault(); handleColor(); }}>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="mb-3">
                                            <MDBInput
                                                wrapperClass='mb-3'
                                                type='text'
                                                required
                                                label='Color Name'
                                                tabIndex="3"
                                                onChange={(e) => setColor(e.target.value)}
                                                value={Color}
                                                name='Color'
                                            />
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className="mb-3">
                                            <MDBInput
                                                wrapperClass='mb-3'
                                                type="color"
                                                required
                                                label='Color Code'
                                                tabIndex="3"
                                                onChange={(e) => setColorCode(e.target.value)}
                                                value={ColorCode}
                                                name='ColorCode'
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
                            <Button variant="primary" onClick={handleColor} style={{ width: '15%' }}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className='col-12'>
                    <ColorTable
                        data={ColorData}
                        deleteColorRecord={deleteColorRecord}
                        openEditForm={openEditForm} // Pass edit function to table
                    />
                </div>
            </div>
        </div>
    );
}
