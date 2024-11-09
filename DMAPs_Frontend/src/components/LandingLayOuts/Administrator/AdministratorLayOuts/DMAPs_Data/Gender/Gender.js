import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput } from 'mdb-react-ui-kit';
import genderService from '../../../../../../services/genderService';
import { trackPromise } from 'react-promise-tracker';
import GenderTable from './GenderTable';

export default function Gender() {
    const [show, setShow] = useState(false);
    const [gender, setGender] = useState([]);
    const [genderData, setGenderData] = useState([]);
    const [genderId, setGenderId] = useState(null); // State for edit mode

    const handleClose = () => {
        setShow(false);
        setGenderId(null); // Reset edit data on close
        setGender(''); // Clear input field
    };

    const handleForm = () => {
        setShow(true);
    };

    function handleGender() {
        let payload = {
            "Gender": gender,
            ...(genderId && { "id": genderId }) // Include id if editing
        };

        const apiCall = genderId
            ? genderService.updateGender({ data: [payload] }) // Update if editing
            : genderService.saveGender({ data: [payload] }); // Save if new entry

        trackPromise(
            apiCall
                .then(response => {
                    if (response.status === 200) {
                        alert(genderId ? "Gender updated successfully" : "Gender added successfully");
                        getGender(); // Refresh data
                        handleClose(); // Close modal
                    } else {
                        alert(response.data.result);
                    }
                })
                .catch(error => {
                    alert(error.response?.data?.error || error.message);
                })
        );
    }

    const getGender = () => {
        trackPromise(
            genderService.getGender().then((response) => {
                setGenderData(response.data.gender);
            })
        );
    };

    useEffect(() => {
        getGender();
    }, []);

    const openEditForm = (data) => {
        setGenderId(data.id); // Set data for editing or null for new entry
        setGender(data.Gender); 
        setShow(true);
    };

    const deleteBuyerGroupRecord = (data) => {
        console.log(data);
    }

    return (
        <div className='row'>
            <div className='col-8'>
                <h1 className='h1'>Gender</h1>
            </div>
            <div className='col-4 text-right'>
                <Button className='primary-btn mt-10' onClick={handleForm}>
                    <i className='fa fa-plus fa-white'> </i> Gender
                </Button>
                <Modal
                    show={show}
                    onHide={handleClose}
                    dialogClassName="modal-50w"
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton style={{ color: 'white' }}>
                        <Modal.Title>{genderId ? "Edit Gender" : "Add New Gender"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(e) => { e.preventDefault(); handleGender(); }}>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className="mb-3">
                                        <MDBInput
                                            wrapperClass='mb-3'
                                            type='text'
                                            required
                                            label='Gender'
                                            tabIndex="3"
                                            onChange={(e) => setGender(e.target.value)}
                                            value={gender}
                                            name='gender'
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
                        <Button variant="primary" onClick={handleGender} style={{ width: '15%' }}>
                        {genderId ? "Update" : "Save"}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className='col-12'>
                <GenderTable data={genderData} openEditForm={openEditForm} deleteBuyerGroupRecord={deleteBuyerGroupRecord}/>
            </div>
        </div>
    );
}
