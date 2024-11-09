// PrintType.js
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput } from 'mdb-react-ui-kit';
import { trackPromise } from 'react-promise-tracker';
import printTypeService from '../../../../../../services/printtypeService';
import PrintTypeTable from './PrintTypeTable';

export default function PrintType() {
    const [printType, setPrintType] = useState("");
    const [show, setShow] = useState(false);
    const [printTypeData, setPrintTypeData] = useState([]);
    const [printTypeId, setPrintTypeId] = useState(null);

    const handleClose = () => {
        setShow(false);
        setPrintType(""); // Clear input
        setPrintTypeId(null); // Reset ID for add mode
    };

    const handleForm = () => {
        setShow(true);
    };

    const handlePrintType = () => {
        const payload = { 
            print_type: printType, 
            ...(printTypeId && { id: printTypeId }) // Include ID if editing
        };

        const apiCall = printTypeId
            ? printTypeService.updatePrintType({ data: [payload] }) // Update if editing
            : printTypeService.savePrintType({ data: [payload] }); // Save if new entry

        trackPromise(
            apiCall
                .then(response => {
                    if (response.status === 200) {
                        alert(printTypeId ? "Print Type updated successfully" : "Print Type added successfully");
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

    const getPrintType = () => {
        trackPromise(
            printTypeService.getPrintType().then((response) => {
                setPrintTypeData(response.data.print_type);
            })
        );
    };

    const editPrintType = (data) => {
        setPrintType(data.print_type); // Make sure this matches the API key
        setPrintTypeId(data.id);
        setShow(true);
    };

    const deletePrintType = (data) => {
        if (window.confirm("Are you sure to delete the Print Type?")) {
            let payload = { id: data.id };
            trackPromise(
                printTypeService.deletePrintType({ data: [payload] })
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

    useEffect(() => {
        getPrintType();
    }, []);

    return (
        <div>
            <div className='row'>
                <div className='col-8'>
                    <h1 className='h1'>Print Type</h1>
                </div>
                <div className='col-4 text-right'>
                    <Button className='primary-btn mt-10' onClick={handleForm}>
                        <i className='fa fa-plus fa-white'></i> Print Type
                    </Button>
                    <Modal show={show} onHide={handleClose} dialogClassName="modal-50w" backdrop="static" keyboard={false}>
                        <Modal.Header closeButton style={{ color: 'white' }}>
                            <Modal.Title>{printTypeId ? "Edit Print Type" : "Add New Print Type"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handlePrintType}>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="mb-3">
                                            <MDBInput
                                                wrapperClass='mb-3'
                                                type='text'
                                                required
                                                label='Print Type'
                                                tabIndex="3"
                                                onChange={(e) => setPrintType(e.target.value)}
                                                value={printType} // Pre-populates with `printType`
                                                name='printType'
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
                            <Button variant="primary" onClick={handlePrintType} style={{ width: '15%' }}>
                                {printTypeId ? "Update" : "Save"}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className='col-12'>
                    <PrintTypeTable
                        data={printTypeData}
                        deletePrintType={deletePrintType}
                        openEditForm={editPrintType} // Pass the edit function as prop
                    />
                </div>
            </div>
        </div>
    );
}
