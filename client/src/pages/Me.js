import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col, Table, Nav } from 'react-bootstrap/';
import { Card, CardBody} from '../components/Card/Card';

import "../App.css";

function Me() {
	const [redirect, setRedirect] = useState(false);
	const [email, setEmail] = useState('');
	const [city, setCity] = useState('');

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
							city,
							departure_date
						}
					}
					`
				})
			})
			.then((res) => res.json())
			.then((res) => {
				res.data.userSubscriptions
					&& res.data.userSubscriptions.length !== 0
					&& setCity(res.data.userSubscriptions[0].city);
			});
		}

		fetchData();
		getToken();
	});

	console.log(city);

	if (redirect) {
		return <Redirect to="/" />;
	}

	return (
		<div>
			<div className="parallax">
				<Row className="justify-content-center" style={{paddingTop: '300px'}}>
					<Row className="justify-content-center">
						<Col
							style={{
								backgroundColor: 'rgb(255, 255, 255)',
								borderRadius: '20px'
							}}
							lg={8}
						>
							<Row
									style={{
										backgroundColor: 'rgb(247,	247,	247)',
										padding: '0.5em',
										borderRadius: '0px'
									}}
									className="justify-content-center sticky"
								>
								<Card
									style={{
										width: '395px',
										height: '255px'
									}}
								>
									<CardBody
										classExtra="chosen-cities">
											{city}
									</CardBody>
								</Card>
							</Row>
						</Col>
					</Row>
				</Row>
				<footer id="footer" />
			</div>
		</div>
	);
}

export default Me;
