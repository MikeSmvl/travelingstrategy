import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap/';
import { addChosenCities } from '../utils/parsingTools';


import '../App.css';


function Me() {
	const [redirect, setRedirect] = useState(false);
	const [email, setEmail] = useState('');
	const [cities, setCities] = useState([]);

	useEffect(() => {
		async function getToken() {
			const response = await fetch('http://localhost:4000/checktoken', { credentials: 'include' });
			await fetch('http://localhost:4000/checktoken', { credentials: 'include' })
				.then((res) => res.json())
				.then((res) => {
					res.email
					&& res.email !== null
					&& setEmail(res.email);
				});
			if (response.ok) { // if HTTP-status is 200-299
			} else {
				setRedirect(true);
			}
		}

		async function fetchData() {
			await fetch('http://localhost:4000/graphql', {
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
				// console.log(res.data.userSubscriptions);
					res.data.userSubscriptions
					&& res.data.userSubscriptions.length !== 0
					&& setCities(res.data.userSubscriptions);
				});
		}

		fetchData();
		getToken();
	});

	if (redirect) {
		return <Redirect to="/" />;
	}


	return (
		<div>
			<div className="parallax">
				<Row className="justify-content-center" style={{ paddingTop: '300px' }}>
					<Row className="justify-content-center">
						<Col
							style={{
								backgroundColor: 'rgb(255, 255, 255)',
								borderRadius: '20px'
							}}
							lg={8}
						>
							{addChosenCities(cities)}
						</Col>
					</Row>
				</Row>
				<footer id="footer" />
			</div>
		</div>
	);
}

export default Me;
