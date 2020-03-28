import React, { useState } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {getBotKnowledge } from '../../../utils/eventsTools';

const IntelBotResult = (props) => {
	const {
        show = '',
		handleClose = '',
		knowledge = '',
	} = props;

	console.log(knowledge)
	return(
		<Modal
			show={show}
			onHide={handleClose}
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="example-modal-sizes-title-lg">
					Here's What I know
				</Modal.Title>
			</Modal.Header>
			<ModalBody style={{ textAlign: 'center' }}>
					{getBotKnowledge(knowledge)}
			</ModalBody>
		</Modal>
	)
}
const IntelBot = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [botKnowledge, setBotKnowledge] = useState([]);

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
		setIsLoading(true);
        const eventInfo = eventCategory+" "+description+" "+title+" "+address+" "+nameOfPlace;
        const body = {
            eventInfo
        }

		await fetch(`${process.env.REACT_APP_BACKEND}intelInfo`, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		})
		.then((res) => res.json())
		.then((res) => {
			setIsLoading(false);
			setBotKnowledge(res);
		})
	}

    return(
			<>{botKnowledge.length === 0
				?
				<Modal
					show={show}
					onHide={handleClose}
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title id="example-modal-sizes-title-lg">
							{!isLoading
								? <h2>Scratch my head to find out what I know about this event</h2>
								: <h2>Let me think a moment</h2>
							}
						</Modal.Title>
					</Modal.Header>
					{!isLoading
					?<ModalBody style={{ textAlign: 'center' }} onClick={getBotInfo}>
						<img alt="Alert" src={require('../../../eventsImages/smart-monkey.gif')} />
					</ModalBody>
					: <ModalBody style={{ textAlign: 'center' }}>
						<img alt="Alert" src={require('../../../eventsImages/thinky-monkey.gif')} />
					</ModalBody>
					}
				</Modal>
				:
				<IntelBotResult
					show={show}
					handleClose={handleClose}
					knowledge={botKnowledge}
				/>
			}
			</>
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