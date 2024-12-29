import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput } from 'mdb-react-ui-kit';
import { trackPromise } from 'react-promise-tracker';
import CountryTable from './CountryTable';
import CountryService from '../../../../../../services/CountryService';

export default function Country() {
    const [Country, setCountry] = useState("");
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false); // To track edit mode
    const [currentCountry, setCurrentCountry] = useState(null); // Store data to be edited
    const [CountryData, setCountryData] = useState([]);

    // Close modal and reset form
    const handleClose = () => {
        setShow(false);
        setEditMode(false);
        setCurrentCountry(null);
        setCountry("");
    };

    const handleForm = () => {
        setShow(true);
    };

    // Save or update Country 
    const handleCountry = () => {
        const payload = {
            id: currentCountry?.id, // Include id if editing
            Country_Name : Country,
        };

        const saveOrUpdate = editMode
            ? CountryService.updateCountry({ data: [payload] })
            : CountryService.saveCountry({ data: [payload] });

        trackPromise(
            saveOrUpdate
                .then(response => {
                    if (response.status === 200) {
                        getCountry();
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

    // Fetch Country data
    const getCountry = () => {
        trackPromise(
            CountryService.getCountry().then(response => {
                console.log(response);
                setCountryData(response.data.Shipment_Mode);
            })
        );
    };

    // Initialize Country  data
    useEffect(() => {
        getCountry();
    }, []);

    // Delete Country  record
    const deleteCountryRecord = (data) => {
        if (window.confirm("Are you sure to delete the Country ?")) {
            const payload = { id: data.id };
            trackPromise(
                CountryService.deleteCountry({ data: [payload] })
                    .then(response => {
                        if (response.status === 200) {
                            getCountry();
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
        setCurrentCountry(data);
        setCountry(data.Country_Name); // Pre-fill the field with existing data
        setShow(true);
    };

    return (
        <div>
            <div className='row'>
                <div className='col-8'>
                    <h1 className='h1'> Country  </h1>
                </div>
                <div className='col-4 text-right'>
                    <Button className='primary-btn mt-10' onClick={handleForm}>
                        <i className='fa fa-plus fa-white'> </i> Country 
                    </Button>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        dialogClassName="modal-50w"
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton style={{ color: 'white' }}>
                            <Modal.Title> {editMode ? "Edit Country " : "Add New Country "} </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={(e) => { e.preventDefault(); handleCountry(); }}>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="mb-3">
                                            <MDBInput
                                                wrapperClass='mb-3'
                                                type='text'
                                                required
                                                label='Country '
                                                tabIndex="3"
                                                onChange={(e) => setCountry(e.target.value)}
                                                value={Country}
                                                name='Country'
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
                            <Button variant="primary" onClick={handleCountry} style={{ width: '15%' }}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className='col-12'>
                    <CountryTable
                        data={CountryData}
                        deleteCountryRecord={deleteCountryRecord}
                        openEditForm={openEditForm} // Pass edit function to table
                    />
                </div>
            </div>
        </div>
    );
}
