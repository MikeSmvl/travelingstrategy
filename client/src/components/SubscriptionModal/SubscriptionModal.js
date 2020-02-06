import * as React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const SubscriptionModal = (props) => {
	const {
		show = '',
		handleShow = '',
		handleClose = '',
		...rest
	} = props;
	return (
		<>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </>
	);
};

SubscriptionModal.propTypes = {
    show: PropTypes.bool,
	handleShow: PropTypes.func,
	handleClose: PropTypes.func
};


export default SubscriptionModal;
