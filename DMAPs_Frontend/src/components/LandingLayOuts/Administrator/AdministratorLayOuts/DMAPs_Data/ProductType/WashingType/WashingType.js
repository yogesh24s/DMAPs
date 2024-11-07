import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput, MDBRadio } from 'mdb-react-ui-kit';
import { trackPromise } from 'react-promise-tracker';
import washingtypeService from '../../../../../../../services/washingtypeService';
import WashingTypeTable from './WashingTypeTable';

export default function WashingType() {
    const [washingType, setWashingType] = useState("")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [washingTypeData, setWashingTypeData] = useState([])

    const handleForm =() => {
        setShow(true)
    }

    function handleWashingType() {
        debugger
        let payload = {
            "washing_type": washingType,

        }
        debugger
        trackPromise(
            new Promise((resolve, reject) => {
                const result = washingtypeService.saveWashingType({ "data": [payload] });
                if (result) resolve(result);
                else reject(new Error("genderService.saveGender returned undefined"));
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
			washingtypeService.getWashingType().then((response) => {
                debugger
                console.log("printtype,",response.data.print_type);
                
				setWashingTypeData(response.data.washing_type)
			})
		);
	}
	useEffect(() => {
		getPrintType()
	}, [])


    const deleteWashingRecord = (data) => {
        debugger
		if (window.confirm("Are you sure to delete the Company Buyer ?")) {
			let payload = {
				"id": data.id
			}
			trackPromise(washingtypeService.deleteWashingRecord({ "data": [payload] }).then((response) => {
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
                <h1 className='h1'> Washing Type </h1>
            </div>
            <div className='col-4 text-right'>
                <Button className='primary-btn mt-10' onClick={handleForm}>
                    <i className='fa fa-plus fa-white'> </i> Washing Type
                </Button>
                <Modal show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="modal-50w"
                    backdrop="static"
                    keyboard={false}>

                    <Modal.Header closeButton style={{ color: 'white' }}>
                        <Modal.Title> Add New Washing Type </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleWashingType}>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Print Type</label>
                                    <div className="mb-3">
                                    <MDBInput wrapperClass='mb-3' type='text' required label='Washing Type' tabindex="3" onChange={(e) => { setWashingType(e.target.value) }} value={washingType} name='washingType' />
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
							Save
						</Button>
					</Modal.Footer>

                </Modal>
            </div>
            <div className='col-12'>
            <WashingTypeTable data={washingTypeData} deleteWashingRecord={deleteWashingRecord} />

            </div>
        </div>
    </div>
  )
}
