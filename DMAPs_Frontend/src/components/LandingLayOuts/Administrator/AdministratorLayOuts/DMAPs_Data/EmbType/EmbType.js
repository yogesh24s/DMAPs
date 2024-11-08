import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput, MDBRadio } from 'mdb-react-ui-kit';
import { trackPromise } from 'react-promise-tracker';
import embTypeService from '../../../../../../services/embService';
import EmbTypeTable from './EmbTypeTable';

export default function EmbType() {
    const [embType, setEmbType] = useState("")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [embTypeData, setEmbTypeData] = useState([])

    const handleForm =() => {
        setShow(true)
    }

    function handleEmbType() {
        debugger
        let payload = {
            "emb_type": embType,

        }
        debugger
        trackPromise(
            new Promise((resolve, reject) => {
                const result = embTypeService.saveEmbType({ "data": [payload] });
                if (result) resolve(result);
                else reject(new Error(""));
            })
                .then(response => {
                    if (response.status === 200) {
                        // getPrintType()
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

    const getEmbType = () => {
        debugger
		trackPromise(
			embTypeService.getEmbType().then((response) => {
                debugger
                console.log("printtype,",response.data.emb_type);
                
				setEmbTypeData(response.data.emb_type)
			})
		);
	}
	useEffect(() => {
		getEmbType()
	}, [])


    const deleteEmbType = (data) => {
        debugger
		if (window.confirm("Are you sure to delete the Emb  Type ?")) {
			let payload = {
				"id": data.id
			}
			trackPromise(embTypeService.deleteEmbType({ "data": [payload] }).then((response) => {
				//check login response
				if (response.status === 200) {
					getEmbType()
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
                <h1 className='h1'> Emb Type </h1>
            </div>
            <div className='col-4 text-right'>
                <Button className='primary-btn mt-10' onClick={handleForm}>
                    <i className='fa fa-plus fa-white'> </i> Emb Type
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
                        <form onSubmit={handleEmbType}>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Emb Type</label>
                                    <div className="mb-3">
                                    <MDBInput wrapperClass='mb-3' type='text' required label='Emb Type' tabindex="3" onChange={(e) => { setEmbType(e.target.value) }} value={embType} name='embType' />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
						<Button variant="secondary" onClick={handleClose} style={{ width: '15%' }}>
							Cancel
						</Button>
						<Button variant="primary" onClick={handleEmbType} style={{ width: '15%' }}>
							Save
						</Button>
					</Modal.Footer>

                </Modal>
            </div>
            <div className='col-12'>
            <EmbTypeTable data={embTypeData} deleteEmbType={deleteEmbType} />

            </div>
        </div>
    </div>
  )
}
