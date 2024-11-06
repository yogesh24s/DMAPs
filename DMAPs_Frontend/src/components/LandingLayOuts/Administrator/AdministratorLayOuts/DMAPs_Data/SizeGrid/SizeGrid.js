import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput, MDBRadio } from 'mdb-react-ui-kit';
import { trackPromise } from 'react-promise-tracker';
import sizeGridService from '../../../../../../services/sizeGridService';
import SizeGridTable from './SizeGridTable';

export default function SizeGrid() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleForm =() => {
        setShow(true)
    }
    const [sizeGrid, setSizeGrid] = useState("")
    const [sizeGridData, setSizeGridData] = useState([])
    const handleSizeGrid = () => {
        debugger
        let payload = {
			"Size_Grid": sizeGrid,
			
		}
        debugger
        trackPromise(
            new Promise((resolve, reject) => {
                const result = sizeGridService.saveSizeGrid({ "data": [payload] });
                if (result) resolve(result);
                else reject(new Error(""));
            })
            .then(response => {
                if (response.status === 200) {
                    alert("Size Grid added successfully")
                    handleClose();
                } else {
                    alert(response.data.result);
                }
            })
            .catch(error => {
                alert(error.response?.data?.error || error.message);
            })
        );
    }

    const getSizeGrid = () => {
        debugger
        trackPromise(
            sizeGridService.getSizeGrid().then((response) => {
                debugger
                setSizeGridData(response.data.sizeGrid)
            })
        );
    }
    useEffect(() => {
        getSizeGrid()
    }, [])

  return (
    <div>
            <div className='row'>
                <div className='col-8'>
                    <h1 className='h1'> Size Grid </h1>
                </div>
                <div className='col-4 text-right'>
                    <Button className='primary-btn mt-10' onClick={handleForm}>
                        <i className='fa fa-plus fa-white'> </i> Size Grid 
                    </Button>
                    <Modal show={show}
                        onHide={() => setShow(false)}
                        dialogClassName="modal-50w"
                        backdrop="static"
                        keyboard={false}>

                        <Modal.Header closeButton style={{ color: 'white' }}>
                            <Modal.Title> Add New Size Grid</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleSizeGrid}>
                                <div className='row'>
                                    <div className='col-6'>
                                        {/* <label>Season Type</label> */}
                                        <div className="mb-3">
                                            <MDBInput wrapperClass='mb-3' type='text' required label='Size Grid' tabindex="3" onChange={(e) => { setSizeGrid(e.target.value) }} value={sizeGrid} name='sizegrid' />
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
                                Save
                            </Button>
                        </Modal.Footer>

                    </Modal>
                </div>
                <div className='col-12'>
                    <SizeGridTable data={sizeGridData} />

                </div>
            </div>
        </div>
  )
}
