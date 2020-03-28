import React from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import PropTypes from 'prop-types';

const IntelBot = (props) => {
    const {
        show = '',
        handleClose = '',
        eventCategory = '',
        description = '',
        title = '',
        address = '',
        nameOfPlace = ''
    } = props;
    
    async function getBotInfo(){
        const eventInfo = eventCategory+" "+description+" "+title+" "+address+" "+nameOfPlace;
        const body = {
            eventInfo
        }
        console.log(body)

		await fetch(`${process.env.REACT_APP_BACKEND}intelInfo`, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		})
		.then((res) => res.json())
		.then((res) => {
			console.log(res)
		})
	}

    return(
            <Modal
				show={show}
				onHide={handleClose}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-lg">
					    <h2>Scratch my head to find out what I know about this event</h2>
					</Modal.Title>
				</Modal.Header>
				<ModalBody style={{ textAlign: 'center' }} onClick={getBotInfo}>
						<img alt="Alert" src={require('../../../eventsImages/smart-monkey.gif')} />
				</ModalBody>
			</Modal>
    )
}

IntelBot.propTypes = {
    show: PropTypes.bool,
	eventCategory: PropTypes.string,
	description: PropTypes.string,
	title: PropTypes.string,
	address: PropTypes.string,
	nameOfPlace: PropTypes.string,
};

export default IntelBot;