import React, { useState, useEffect } from 'react';
import { Toast as RBToast } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Toast.css';


const Toast = (props) => {
	const [showToast, setShowToast] = useState(false);
	const toggleShowToast = () => setShowToast(!showToast);

	const {
		title = '',
		headerIcon = '',
		type = 'default',
		autohide = 0,
		delay = 0
	} = props;

	const { children } = props;

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowToast(true);
		}, delay * 1000);
		return () => clearTimeout(timer);
	}, [delay]);

	let alertClassName;
	type === 'alert' ? alertClassName = 'alertToast' : alertClassName = '';
	let autohideBool;
	autohide ? autohideBool = true : autohideBool = false;
	return (
		<RBToast show={showToast} onClose={toggleShowToast} delay={autohide * 1000} autohide={autohideBool} className={`TSToast ${alertClassName}`}>
			<RBToast.Header>
				<strong className={`mr-auto ${headerIcon}`}>  {title}</strong>
			</RBToast.Header>
			<RBToast.Body>{children}</RBToast.Body>
		</RBToast>
	);
};

Toast.propTypes = {
	title: PropTypes.string,
	type: PropTypes.string,
	autohide: PropTypes.number,
	delay: PropTypes.number
};

export default Toast;
