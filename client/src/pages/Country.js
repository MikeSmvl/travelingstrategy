import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import { Card, CardBody, Divider } from '../components/Card/Card';
import Header from '../components/Header/Header';
import '../App.css';

function Country({ origin, destination }) {
	const [books, setBooks] = useState({});

	useEffect(() => {
		async function fetchData() {
			await fetch('http://localhost:4000/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query: '{ books { author title } }' })
			})
				.then((res) => res.json())
				.then((res) => setBooks(res.data));
		}
		fetchData();
	});

	if (!origin || !destination) {
		return <Redirect to="/" />;
	}

	return (
		<div>
			<ReactFullpage
				licenseKey="CF1896AE-3B194629-99B627C1-841383E5"
				scrollingSpeed={1000} /* Options here */
				sectionsColor={['rgb(232, 233, 241)', 'rgb(255, 222, 206)']}
				navigation
				navigationPosition="left"
				navigationTooltips={['Basics', 'Health & Safety', 'Money']}
				anchors={['basics', 'health', 'money']}
				render={({ state, fullpageApi }) => {
					return (
						<ReactFullpage.Wrapper>
							<div className="section App">
								<Header title="Paris" subtitle="France" />
								<p>Basics</p>
								<div style={{ padding: '20px' }}>
									<Card><CardBody>{JSON.stringify(books)}</CardBody><Divider /></Card>
								</div>
								<p>Basics</p>
								<p>{JSON.stringify(books)}</p>
								<p>Origin is {origin}</p>
								<p>Destination is {destination}</p>
							</div>
							<div className="section">
								<p>Health & Safety</p>
							</div>
							<div className="section">
								<p>Money</p>
							</div>
						</ReactFullpage.Wrapper>
					);
				}}
			/>
		</div>
	);
}

export default Country;
