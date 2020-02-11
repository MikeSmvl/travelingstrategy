import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

function Me() {
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		async function getToken() {
			const response = await fetch('http://localhost:4000/checktoken', { credentials: 'include' });
			if (response.ok) { // if HTTP-status is 200-299
			} else {
				setRedirect(true);
			}
		}

		getToken();
	});

	if (redirect) {
		return <Redirect to="/" />;
	}

	return (
		<div />
	);
}

export default Me;
