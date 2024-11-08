import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput, MDBRadio } from 'mdb-react-ui-kit';
import { trackPromise } from 'react-promise-tracker';
import printtypeService from '../../../../../../services/printtypeService';
import PrintTypeTable from './PrintTypeTable';

export default function PrintType() {

    const [printType, setPrintType] = useState("")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [printTypeData, setPrintTypeData] = useState([])

    const handleForm =() => {
        setShow(true)
    }

    function handlePrintType() {
        debugger
        let payload = {
            "print_type": printType,

        }
        debugger
        trackPromise(
            new Promise((resolve, reject) => {
                const result = printtypeService.savePrintType({ "data": [payload] });
                if (result) resolve(result);
                else reject(new Error(""));
            })
                .then(response => {
                    if (response.status === 200) {
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

    const getPrintType = () => {
        debugger
		trackPromise(
			printtypeService.getPrintType().then((response) => {
                debugger
                console.log("printtype,",response.data.print_type);
                
				setPrintTypeData(response.data.print_type)
			})
		);
	}
	useEffect(() => {
		getPrintType()
	}, [])

    const deletePrintType = (data) => {
        debugger
		if (window.confirm("Are you sure to delete the Print  Type ?")) {
			let payload = {
				"id": data.id
			}
			trackPromise(printtypeService.deletePrintType({ "data": [payload] }).then((response) => {
				//check login response
				if (response.status === 200) {
					getPrintType()
				}
				else {
					alert(response.data.message);
				}

			}).catch((error) => {
				//console.log(error.response.data.error)
				alert(error.response.data.error);
			})
			);
		}
	};
  return (
    <div>
      <div className='row'>
            <div className='col-8'>
                <h1 className='h1'> Print Type </h1>
            </div>
            <div className='col-4 text-right'>
                <Button className='primary-btn mt-10' onClick={handleForm}>
                    <i className='fa fa-plus fa-white'> </i> Print Type
                </Button>
                <Modal show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="modal-50w"
                    backdrop="static"
                    keyboard={false}>

                    <Modal.Header closeButton style={{ color: 'white' }}>
                        <Modal.Title> Add New Product Type </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handlePrintType}>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Print Type</label>
                                    <div className="mb-3">
                                    <MDBInput wrapperClass='mb-3' type='text' required label='Print Type' tabindex="3" onChange={(e) => { setPrintType(e.target.value) }} value={printType} name='printType' />
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
							Save
						</Button>
					</Modal.Footer>

                </Modal>
            </div>
            <div className='col-12'>
            <PrintTypeTable data={printTypeData}  deletePrintType = {deletePrintType} />

            </div>
        </div>
    </div>
  )
}
