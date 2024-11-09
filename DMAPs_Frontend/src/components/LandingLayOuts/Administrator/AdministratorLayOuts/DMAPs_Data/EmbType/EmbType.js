import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput } from 'mdb-react-ui-kit';
import { trackPromise } from 'react-promise-tracker';
import embTypeService from '../../../../../../services/embService';
import EmbTypeTable from './EmbTypeTable';

export default function EmbType() {
    const [embType, setEmbType] = useState("");
    const [show, setShow] = useState(false);
    const [embTypeData, setEmbTypeData] = useState([]);
    const [empTypeId, setEmpTypeId] = useState(null);


    const handleClose = () => {
        setShow(false);
        setEmpTypeId(null); // Reset edit data on close
        setEmbType(""); // Clear the input field
    };

    const handleForm = (data = null) => {
        setEmpTypeId(data); // Set data for editing or null for new entry
        setEmbType(data ? data.Emb_Type : ""); // Populate form if editing
        setShow(true);
    };

    function handleEmbType() {
        let payload = {
            "emb_type": embType,
            ...(empTypeId && { "id": empTypeId.id }) // Include id if editing
        };

        const request = empTypeId
            ? embTypeService.updateEmbType({ data: [payload] }) // Update if editing
            : embTypeService.saveEmbType({ data: [payload] }); // Save if new entry

        trackPromise(
            request
                .then(response => {
                    if (response.status === 200) {
                        getEmbType(); // Refresh data
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

    const getEmbType = () => {
        trackPromise(
            embTypeService.getEmbType().then((response) => {
                setEmbTypeData(response.data.emb_type);
            })
        );
    };

    useEffect(() => {
        getEmbType();
    }, []);

    const deleteEmbType = (data) => {
        if (window.confirm("Are you sure to delete the Emb Type?")) {
            let payload = { "id": data.id };
            trackPromise(
                embTypeService.deleteEmbType({ data: [payload] }).then((response) => {
                    if (response.status === 200) {
                        getEmbType(); // Refresh data
                    } else {
                        alert(response.data.message);
                    }
                }).catch((error) => {
                    alert(error.response.data.error);
                })
            );
        }
    };

    return (
        <div>
            <div className='row'>
                <div className='col-8'>
                    <h1 className='h1'>Emb Type</h1>
                </div>
                <div className='col-4 text-right'>
                    <Button className='primary-btn mt-10' onClick={() => handleForm()}>
                        <i className='fa fa-plus fa-white'> </i> Emb Type
                    </Button>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        dialogClassName="modal-50w"
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>{empTypeId ? "Edit Emb Type" : "Add New Emb Type"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={(e) => { e.preventDefault(); handleEmbType(); }}>
                                <div className='row'>
                                    <div className='col-6'>
                                        {/* <label>Emb Type</label> */}
                                        <MDBInput
                                            wrapperClass='mb-3'
                                            type='text'
                                            required
                                            label='Emb Type'
                                            tabindex="3"
                                            onChange={(e) => { setEmbType(e.target.value); }}
                                            value={embType}
                                            name='embType'
                                        />
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} style={{ width: '15%' }}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleEmbType} style={{ width: '15%' }}>
                            {empTypeId ? "Update" : "Save"}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className='col-12'>
                    <EmbTypeTable
                        data={embTypeData}
                        deleteEmbType={deleteEmbType}
                        openEditForm={handleForm} // Pass handleForm as edit handler
                    />
                </div>
            </div>
        </div>
    );
}
