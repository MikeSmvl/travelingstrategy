import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { addChosenCities } from '../utils/parsingTools';

import './Me.css';

function Me() {
	const [redirect, setRedirect] = useState(false);
	const [email, setEmail] = useState('');
	const [cities, setCities] = useState([]);

	useEffect(() => {
		async function getToken() {
			await fetch(`${process.env.REACT_APP_BACKEND}checktoken`, { credentials: 'include' })
				.then((res) => res.json())
				.then((res) => {
					res.email
                && res.email !== null
                && setEmail(res.email);
				})
				.catch((error) => {
					// if status code 401...
					setRedirect(true);
				});
		}

		async function fetchData() {
			await fetch(`${process.env.REACT_APP_BACKEND}graphql`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `{
						userSubscriptions(email:"${email}"){
							email,
							search_term,
							date_of_trip,
							request_id,
							latitude,
							longitude
						}
					}
					`
				})
			})
				.then((res) => res.json())
				.then((res) => {
					res.data.userSubscriptions
					&& res.data.userSubscriptions.length !== 0
					&& setCities(res.data.userSubscriptions);
				});
		}

		fetchData();
		getToken();
	}, [email]);

	if (redirect) {
		return <Redirect to="/" />;
	}


	return (
		<>
			{addChosenCities(cities)}
		</>
	);
}

export default Me;
