import React, { useState } from 'react';
import { Card, Modal, ModalBody } from 'react-bootstrap';
import PropTypes from 'prop-types';

const IntelBot = (props) => {
    const {
        show = '',
        handleClose = ''
	} = props;

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
				<ModalBody style={{ textAlign: 'center' }}>
						<img alt="Alert" src={require('../../../eventsImages/smart-monkey.gif')} />
				</ModalBody>
			</Modal>
    )
}

IntelBot.propTypes = {
	show: PropTypes.bool
};

export default IntelBot;