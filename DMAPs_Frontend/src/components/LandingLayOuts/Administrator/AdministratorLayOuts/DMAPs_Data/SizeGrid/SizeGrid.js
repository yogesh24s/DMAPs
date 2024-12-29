import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput } from 'mdb-react-ui-kit';
import { trackPromise } from 'react-promise-tracker';
import sizeGridService from '../../../../../../services/sizeGridService';
import SizeGridTable from './SizeGridTable';

export default function SizeGrid() {
    const [show, setShow] = useState(false);
    const [sizeGrid, setSizeGrid] = useState("");
    const [sizeGridValue, setSizeGridValue] = useState("");
    const [sizeGridData, setSizeGridData] = useState([]);
    const [sizeGridDataId, setSizeGridDataId] = useState(null);

    const handleForm = () => setShow(true);

    const handleClose = () => {
        setShow(false);
        setSizeGrid("");
        setSizeGridValue("");
        setSizeGridDataId(null);
    };

    const handleSizeGrid = (e) => {
        e.preventDefault(); // Prevent form default submission
        const payload = {
            "Size_Grid_Name": sizeGrid,
            "Size_Grid_Value" :sizeGridValue,
            ...(sizeGridDataId && { "Size_Grid_Id": sizeGridDataId })
        };

        const request = sizeGridDataId
            ? sizeGridService.updateSizeGrid({ "data": [payload] })
            : sizeGridService.saveSizeGrid({ "data": [payload] });

        trackPromise(
            request
                .then(response => {
                    if (response.status === 200) {
                        alert(sizeGridDataId ? "Size Grid updated successfully" : "Size Grid added successfully");
                        handleClose();
                        getSizeGrid();
                    } else {
                        alert(response.data.result);
                    }
                })
                .catch(error => {
                    alert(error.response?.data?.error || error.message);
                })
        );
    };

    const getSizeGrid = () => {
        trackPromise(
            sizeGridService.getSizeGrid()
                .then(response => setSizeGridData(response.data.sizeGrid))
        );
    };

    useEffect(() => {
        getSizeGrid();
    }, []);

    const deleteSizeGrid = (data) => {
        if (window.confirm("Are you sure to delete the Size Grid?")) {
            const payload = { "Size_Grid_Id": data.Size_Grid_Id };
            trackPromise(
                sizeGridService.deleteSizeGrid({ "data": [payload] })
                    .then(response => {
                        if (response.status === 200) {
                            getSizeGrid();
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

    const openEditForm = (sizegrid) => {
        setSizeGrid(sizegrid.Size_Grid_Name); // Set size grid name for editing
        setSizeGridValue(sizegrid.Size_Grid_Value)
        setSizeGridDataId(sizegrid.Size_Grid_Id);  // Set ID for edit mode
        setShow(true);
    };

    return (
        <div>
            <div className='row'>
                <div className='col-8'>
                    <h1 className='h1'>Size Grid</h1>
                </div>
                <div className='col-4 text-right'>
                    <Button className='primary-btn mt-10' onClick={handleForm}>
                        <i className='fa fa-plus fa-white'></i> Size Grid
                    </Button>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        dialogClassName="modal-50w"
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton style={{ color: 'white' }}>
                            <Modal.Title>{sizeGridDataId ? "Edit Size Grid" : "Add New Size Grid"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleSizeGrid}>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="mb-3">
                                            <MDBInput
                                                wrapperClass='mb-3'
                                                type='text'
                                                required
                                                label='Size Grid Name'
                                                tabIndex="3"
                                                onChange={(e) => setSizeGrid(e.target.value)}
                                                value={sizeGrid}
                                                name='sizegrid'
                                            />
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className="mb-3">
                                            <MDBInput
                                                wrapperClass='mb-3'
                                                type='text'
                                                required
                                                label='Size Grid Value'
                                                tabIndex="3"
                                                onChange={(e) => setSizeGridValue(e.target.value)}
                                                value={sizeGridValue}
                                                name='sizeGridValue'
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
                            <Button variant="primary" onClick={handleSizeGrid} style={{ width: '15%' }}>
                                {sizeGridDataId ? "Update" : "Save"}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className='col-12'>
                    <SizeGridTable data={sizeGridData} deleteSizeGrid={deleteSizeGrid} openEditForm={openEditForm} />
                </div>
            </div>
        </div>
    );
}
