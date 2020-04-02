import React, {useState, useEffect} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {CitiesCard, CityImage} from '../components/CitiesCard/CitiesCard';
import TStimbre from './TStimbre.png'

import './Me.css';

function Me() {
	const [redirect, setRedirect] = useState(false);
	const [email, setEmail] = useState('');
	const [cities, setCities] = useState([]);
	const currentDate = new Date().toISOString().slice(0, 10);

	useEffect(() => {
		async function getToken() {
			await fetch(`${process.env.REACT_APP_BACKEND}checktoken`, {
				credentials: 'include'
			})
				.then(res => res.json())
				.then(res => {
					res.email && res.email !== null && setEmail(res.email);
				})
				.catch(error => {
					// if status code 401...
					setRedirect(true);
				});
		}

		async function fetchData() {
			await fetch(`${process.env.REACT_APP_BACKEND}graphql`, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
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
				.then(res => res.json())
				.then(res => {
					res.data.userSubscriptions &&
						res.data.userSubscriptions.length !== 0 &&
						setCities(res.data.userSubscriptions);
				});
		}

		fetchData();
		getToken();
	}, [email]);

	if (redirect) {
		return <Redirect to='/' />;
	}

	return (
		<>
			<div className='currentDate'>{currentDate.replace('/', '-')}</div>
			<div className='meTitle'>My Places</div>
			<div className='citiesCardWrapper'>
				{cities.map((citySubscription, idx) => {
					const requestId = citySubscription.request_id;
					const cityName = citySubscription.search_term;
					const {latitude} = citySubscription;
					const {longitude} = citySubscription;

					return (
						<Link
							key={idx}
							to={`/user_selection?request_id=${requestId}&city=${cityName}&latitude=${latitude}&longitude=${longitude}`}>
							<CitiesCard>
								<CityImage key={idx} cityName={cityName.toLowerCase()} />
							</CitiesCard>
						</Link>
					);
				})}
			</div>
			<img className="timbreImage" alt="" src={TStimbre} />
		</>
	);
}

export default Me;
