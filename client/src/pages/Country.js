import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import { Row, Col } from 'react-bootstrap/';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import { Card, CardBody } from '../components/Card/Card';
import Header from '../components/Header/Header';
import { CountryCard } from '../components/CountryCard/CountryCard';
import Subtitle from '../components/Subtitle/Subtitle';
import getCountryCode from '../utils/countryToISO';
import getCountryName from '../utils/ISOToCountry';
import '../App.css';

function Country({ origin, destination, languages }) {
	const [advisoryInfo, setAdvisory] = useState({});
	const [visaInfo, setVisa] = useState({});
	const [official_languages, setOfficial] = useState({});
	const [regional_languages, setRegional] = useState({});
	const [minority_languages, setMinority] = useState({});
	const [national_languages, setNational] = useState({});
	const [widely_spoken_languages, setWidely] = useState({});

	useEffect(() => {
		async function fetchData() {
			await fetch('http://localhost:4000/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `{ countryToCountry(origin:"${origin}" destination: "${destination}") { name visa_info advisory_text } }`
				})
			})
				.then((res) => res.json())
				.then((res) => {
					if (res.data.countryToCountry === null || res.data.countryToCountry.length === 0) {
						setAdvisory('Not available yet.');
						setVisa('Not available yet.');
					} else {
						setAdvisory(res.data.countryToCountry[0].advisory_text);
						setVisa(res.data.countryToCountry[0].visa_info);
					}
				});
		}
		fetchData();
	}, [origin, destination]);

	useEffect(() => {
		async function fetchLanguages() {
			await fetch('http://localhost:4000/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `{country_languages(country_iso: "${destination}"){
						official_languages,
						regional_languages,
						minority_languages,
						national_languages,
						widely_spoken_languages
					  }}`
				})
			})
				.then((res) => res.json())
				.then((res) => {
					console.log(res)
					console.log(destination)
					if (res.data.country_languages === null || res.data.country_languages.length === 0) {
						setOfficial('Not available yet.');
						setRegional('Not available yet.');
						setMinority('Not available yet.');
						setNational('Not available yet.');
						setWidely('Not available yet.');
					} else {
						setOfficial(res.data.country_languages[0].official_languages);
						setRegional(res.data.country_languages[0].regional_languages);
						setMinority(res.data.country_languages[0].minority_languages);
						setNational(res.data.country_languages[0].national_languages);
						setWidely(res.data.country_languages[0].widely_spoken_languages);
					}
				});
		}
		fetchLanguages();
	},[languages]);

	if (!origin || !destination) {
		return <Redirect to="/" />;
	}

	const countryCode = getCountryCode(destination);
	const src = `https://www.countryflags.io/${countryCode}/flat/64.png`;
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
				scrollOverflow
				render={({ state, fullpageApi }) => {
					return (
						<ReactFullpage.Wrapper>
							<div className="section App">
								<Header title={getCountryName(destination)} />
								<Subtitle text="Important Basics" />
								<Row
									className="justify-content-center"
									style={{ padding: '5px 25px' }}
								>
									<Col xs="10" sm="4">
										<CountryCard
											flagSrc={src}
											title="Country Flag"
										>
										<CardBody>
											Official Languages: {JSON.stringify(official_languages).replace(/(^")|("$)/g, '')}<br></br>
											Regional Languages: {JSON.stringify(regional_languages).replace(/(^")|("$)/g, '')}<br></br>
											Minority Languages: {JSON.stringify(minority_languages).replace(/(^")|("$)/g, '')}<br></br>
											National Languages: {JSON.stringify(national_languages).replace(/(^")|("$)/g, '')}<br></br>
											Widely Spoken Languages: {JSON.stringify(widely_spoken_languages).replace(/(^")|("$)/g, '')}
										</CardBody>
										</CountryCard>
									</Col>
									<Col xs="10" sm="4">
										<Card header="Visa Info" style={{ textAlign: 'left' }}>
											<CardBody>
											{JSON.stringify(visaInfo).replace(/(^")|("$)/g, '')}
											</CardBody>
										</Card>
									</Col>
									<Col xs="10" sm="4">
										<Card header="Advisory">
											<CardBody>
												<ErrorOutlineOutlinedIcon style={{ color: '#dc3545' }} />
												{JSON.stringify(advisoryInfo).replace(/(^")|("$)/g, '')}
											</CardBody>
										</Card>
									</Col>
								</Row>
							</div>

							<div className="section">
								<Subtitle text="Health & Safety" />
							</div>

							<div className="section">
								<Subtitle text="Money" />
							</div>
						</ReactFullpage.Wrapper>
					);
				}}
			/>
		</div>
	);
}

export default Country;
