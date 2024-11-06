import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput, MDBRadio } from 'mdb-react-ui-kit';
import { trackPromise } from 'react-promise-tracker';
import seasonService from '../../../../../../services/seasonService';
import SeasonTable from './SeasonTable';

export default function Season() {
    const [season, setSeason] = useState("")
    const [show, setShow] = useState(false);
    const [seasonData, setSeasonData] = useState([])
    const handleClose = () => setShow(false);

    const handleForm =() => {
        setShow(true)
    }

    const handleSeason = () => {
        debugger
        let payload = {
			"Season_Name": season,
			
		}
        debugger
        trackPromise(
            new Promise((resolve, reject) => {
                const result = seasonService.saveSeason({ "data": [payload] });
                if (result) resolve(result);
                else reject(new Error(""));
            })
            .then(response => {
                if (response.status === 200) {
                    alert("Season added successfully")
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

    const getSeason = () => {
        debugger
        trackPromise(
            seasonService.getSeason().then((response) => {
                debugger
                setSeasonData(response.data.season)
            })
        );
    }
    useEffect(() => {
        getSeason()
    }, [])

    return (
        <div>
            <div className='row'>
                <div className='col-8'>
                    <h1 className='h1'> Season </h1>
                </div>
                <div className='col-4 text-right'>
                    <Button className='primary-btn mt-10' onClick={handleForm}>
                        <i className='fa fa-plus fa-white'> </i> Season 
                    </Button>
                    <Modal show={show}
                        onHide={() => setShow(false)}
                        dialogClassName="modal-50w"
                        backdrop="static"
                        keyboard={false}>

                        <Modal.Header closeButton style={{ color: 'white' }}>
                            <Modal.Title> Add New Season Type</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleSeason}>
                                <div className='row'>
                                    <div className='col-6'>
                                        {/* <label>Season Type</label> */}
                                        <div className="mb-3">
                                            <MDBInput wrapperClass='mb-3' type='text' required label='Season Name' tabindex="3" onChange={(e) => { setSeason(e.target.value) }} value={season} name='season' />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} style={{ width: '15%' }}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleSeason} style={{ width: '15%' }}>
                                Save
                            </Button>
                        </Modal.Footer>

                    </Modal>
                </div>
                <div className='col-12'>
                    <SeasonTable data={seasonData} />

                </div>
            </div>
        </div>
    )
}
