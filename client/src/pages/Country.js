import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import { Row, Col } from 'react-bootstrap/';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import { Card, CardBody, Divider } from '../components/Card/Card';
import RateCalculator from '../components/RateCalculator/RateCalculator';
import Header from '../components/Header/Header';
import { CountryCard } from '../components/CountryCard/CountryCard';
import Subtitle from '../components/Subtitle/Subtitle';
import getCountryName from '../utils/ISOToCountry';
import getTimeDifference from '../utils/timeDifference';
import { languages, flagSrc, getOtherTrafficSide } from '../utils/parsingTools';
import '../App.css';

function Country({
	originCountry,
	destinationCountry,
	originCity,
	destinationCity,
	originLat,
	originLng,
	destinationLat,
	destinationLng
}) {
	const [advisoryInfo, setAdvisory] = useState('Not available yet');
	const [advisoryLink, setAdvisoryLink] = useState('');
	const [visaInfo, setVisa] = useState('Not available yet');
	const [languagesInfo, setLanguages] = useState({
		'Official Languages': 'TBD',
		'Regional Languages': 'TBD',
		'Widely Spoken Languages': 'TBD'
	});
	const [unsafeAreas, setUnsafeAreas] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [socketType, setSocketType] = useState('Not available yet');
	const [voltage, setVoltage] = useState('Not available yet');
	const [frequency, setFrequency] = useState('Not available yet');
	const [timeOrigin, setTimeOrigin] = useState('Not available yet');
	const [timeDestination, setTimeDestination] = useState('Not available yet');
	const [currencyInfo, setCurrency] = useState({});
	const [originCurrencyInfo, setOriginCurrency] = useState({});
	const [financialInfo, setFinancial] = useState({});
	const [trafficSide, setTrafficSide] = useState('Not available yet');
	const [rate, setRate] = useState('');

	useEffect(() => {
		async function fetchRate(originCode, destinationCode) {
			fetch(`https://api.exchangeratesapi.io/latest?base=${originCode}&symbols=${destinationCode}`)
				.then(
					(response) => {
						if (response.status !== 200) {
							console.log('Exchange Rate API did not return HTTP 200');
							setIsLoading(false);
							return;
						}

						// Set the currency rate from origin to destination
						response.json().then((data) => {
							setRate(data.rates[destinationCode].toFixed(2));
							setIsLoading(false);
						});
					}
				)
				.catch((err) => {
					console.log('Fetch Error :-S', err);
					setIsLoading(false);
				});
		}

		async function fetchData() {
			setIsLoading(true);
			await fetch('http://localhost:4000/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `{
						countryToCountry(origin:"${originCountry}" destination: "${destinationCountry}") {
							name
							visa_info
							advisory_link
							advisory_text
						}
						country_languages(country_iso: "${destinationCountry}"){
							official_languages,
							regional_languages,
							minority_languages,
							national_languages,
							widely_spoken_languages
						}
						country_unsafe_areas(country_iso: "${destinationCountry}"){
							unsafe_areas
						}
						destinationCurrencies: currencies(country: "${destinationCountry}"){
							name
							symbol
							code
						}
						originCurrencies: currencies(country: "${originCountry}"){
							name
							symbol
							code
						}
						country_socket(country_iso: "${destinationCountry}") {
							plug_type,
							electric_potential,
							frequency
						}
						financials(country: "${destinationCountry}") {
							gasoline
							groceries
							rent
						}
						time_difference_origin(lat_origin:${originLat} lng_origin:${originLng} country_origin:"${originCountry}") {
							utc_offset
						}
						time_difference_destination(lat_destination:${destinationLat} lng_destination:${destinationLng} country_destination:"${destinationCountry}") {
							utc_offset
						}
						trafficSide(iso:"${destinationCountry}"){
							traffic_side
						}
					}`
				})
			})
				.then((res) => res.json())
				.then((res) => {
					(res.data.countryToCountry && res.data.countryToCountry.length !== 0) && setAdvisory(res.data.countryToCountry[0].advisory_text);
					(res.data.countryToCountry && res.data.countryToCountry.length !== 0) && setAdvisoryLink(res.data.countryToCountry[0].advisory_link);
					(res.data.countryToCountry && res.data.countryToCountry.length !== 0) && setVisa(res.data.countryToCountry[0].visa_info);
					(res.data.country_languages && res.data.country_languages.length !== 0) && setLanguages(res.data.country_languages[0]);
					(res.data.country_unsafe_areas && res.data.country_unsafe_areas.length !== 0) && setUnsafeAreas(res.data.country_unsafe_areas[0].unsafe_areas);
					(res.data.country_socket && res.data.country_socket.length !== 0) && setSocketType(res.data.country_socket[0].plug_type);
					(res.data.country_socket && res.data.country_socket.length !== 0) && setVoltage(res.data.country_socket[0].electric_potential);
					(res.data.country_socket && res.data.country_socket.length !== 0) && setFrequency(res.data.country_socket[0].frequency);
					(res.data.destinationCurrencies && res.data.destinationCurrencies.length !== 0) && setCurrency(res.data.destinationCurrencies[0]);
					(res.data.originCurrencies && res.data.originCurrencies.length !== 0) && setOriginCurrency(res.data.originCurrencies[0]);
					(res.data.financials && res.data.financials.length !== 0) && setFinancial(res.data.financials[0]);
					(res.data.time_difference_origin && res.data.time_difference_origin.length !== 0) && setTimeOrigin(res.data.time_difference_origin[0].utc_offset);
					(res.data.time_difference_destination && res.data.time_difference_destination.length !== 0) && setTimeDestination(res.data.time_difference_destination[0].utc_offset);
					(res.data.trafficSide && res.data.trafficSide.length !== 0) && setTrafficSide(res.data.trafficSide[0].traffic_side);
					setIsLoading(false);
					fetchRate(res.data.originCurrencies[0].code, res.data.destinationCurrencies[0].code);
				});
		}

		fetchData();
	}, [originCountry, destinationCountry, originLat, originLng, destinationLat, destinationLng]);

	const socketArray = socketType.replace(/\s/g, '').split(',');

	if (!originCountry || !destinationCountry) {
		return <Redirect to="/" />;
	}
	return (
		<div>
			{!isLoading && (
				<ReactFullpage
					licenseKey="CF1896AE-3B194629-99B627C1-841383E5"
					scrollingSpeed={1000} /* Options here */
					sectionsColor={['rgb(232, 233, 241)', 'rgb(255, 222, 206)', 'rgb(228, 221, 241)']}
					navigation
					navigationPosition="left"
					navigationTooltips={['Basics', 'Health & Safety', 'Money']}
					anchors={['basics', 'health', 'money']}
					scrollOverflow
					normalScrollElements=".scrolling-card"
					responsiveWidth={800}
					render={({ state, fullpageApi }) => {
						return (
							<ReactFullpage.Wrapper>
								<div className="section App">
									<Header
										title={getCountryName(destinationCountry)}
										title2={destinationCity}
										title3={getTimeDifference(timeOrigin, timeDestination, originCity)}
									/>
									<Subtitle text="Important Basics" />
									<Row
										className="justify-content-center"
										style={{ padding: '5px 25px' }}
									>
										<Col xs="10" sm="4">
											<CountryCard
												flagSrc={flagSrc(destinationCountry)}
												title="Country Flag"
											>
												<CardBody>
													{languagesInfo !== 'Not available yet.'
														&& languages(languagesInfo)}
												</CardBody>
											</CountryCard>
										</Col>
										<Col xs="10" sm="4">
											{visaInfo !== null && (
												<Card
													className="scrolling-card"
													header="Visa Info"
													style={{ maxHeight: '400px', overflow: 'scroll' }}
												>
													<CardBody
														className="scrolling-card"
														style={{ paddingTop: '0' }}
													>
														<div
															className="scrolling-card"
															dangerouslySetInnerHTML={{ __html: visaInfo }}
														/>
													</CardBody>
												</Card>)}
										</Col>
										<Col xs="10" sm="4">
											{!(advisoryInfo === null || advisoryInfo === "Not available yet") && (
												<Card
													className="scrolling-card"
													header="Advisory"
													style={{ maxHeight: '400px', overflow: 'scroll' }}
												>
													<CardBody>
														<ErrorOutlineOutlinedIcon
															style={{ color: '#dc3545' }}
														/>
														<div
															className="scrolling-card"
															dangerouslySetInnerHTML={{ __html: advisoryInfo }}
														/>
														<div
														dangerouslySetInnerHTML={{ __html: advisoryLink }}
													/>
													</CardBody>
												</Card>)}
										</Col>
									</Row>
								</div>

								<div className="section">
									<Subtitle text="Electricity & Financials" />
									<Row
										className="justify-content-center"
										style={{ padding: '5px 25px' }}
									>
										<Col xs="10" sm="4">
											<Card header="Currency">
												<CardBody>
													<pre>
														<strong>Name:</strong> {currencyInfo.name}
													</pre>
													<pre>
														<strong>Code:</strong> {currencyInfo.code}
													</pre>
													<pre>
														<strong>Symbol:</strong> {currencyInfo.symbol}
													</pre>
													<div
														style={{
															display: 'flex',
															alignItems: 'center',
															justifyContent: 'center'
														}}
													>
														<RateCalculator
															destinationRate={rate}
															originCurrency={originCurrencyInfo.code}
															destCurrency={currencyInfo.code}
														/>
													</div>
												</CardBody>
											</Card>
										</Col>
										<Col xs="10" sm="4">
											<Card header="Prices (in USD)">
												<CardBody>
													<pre>
														<strong>Gasoline:</strong> {financialInfo.gasoline}$
														/ Gallon
													</pre>
													<pre>
														<strong>Groceries:</strong>{' '}
														{financialInfo.groceries}$ / Week
													</pre>
													<pre>
														<strong>Rent:</strong> {financialInfo.rent}$ / Day
													</pre>
												</CardBody>
											</Card>
										</Col>
										<Col xs="10" sm="4">
											<Card header="Sockets & Plugs">
												<CardBody>
													<p>
														{getCountryName(destinationCountry)} uses{' '}
														<b style={{ color: '#FF9A8D' }}>{voltage}</b> and{' '}
														<b style={{ color: '#FF9A8D' }}>{frequency}</b> for
														electrical sockets. Plugs are of{' '}
														<b style={{ color: '#FF9A8D' }}>{socketType}</b>:
													</p>
													<Divider />
													{socketType !== 'Not available yet'
														&& socketArray.map((item) => (
															/* eslint-disable */
															// eslint is giving tab indent errors such as "Expected indentation of 27 tabs but found 14", which makes no sense
															<img
																key={item}
																src={require(`../socketImages/${item}.png`)}
																style={{width: '200px'}}
																alt=''
															/>
															/* eslint-enable */
														))}
												</CardBody>
											</Card>
										</Col>
									</Row>
								</div>
								<div className="section">
									<Subtitle text="Miscellaneous" />
									<Row
										className="justify-content-center"
										style={{ padding: '5px 25px' }}
									>
										<Col xs="10" sm="4">
											<Card header="Traffic Flow">
												<CardBody>
													{trafficSide !== 'Not available yet'
														&& (
															<p>
													In {getCountryName(destinationCountry)} the traffic flow is on the{' '}
																<b style={{ color: '#FF9A8D' }}>{trafficSide} hand</b> side
															</p>
														)}
													<Divider />
													{trafficSide !== 'Not available yet'
														&& (
															<img
																key={trafficSide}
																src={require(`../trafficImages/${trafficSide}.png`)}
																style={{ width: '200px' }}
																alt=""
															/>
														)}
													{trafficSide !== 'Not available yet'
														&& (
															<p style={{ textAlign: 'center' }}>
																<br />
																<b style={{ color: '#FF1C00' }}>
														Warning
																</b><br />
														Be sure to look {getOtherTrafficSide(trafficSide)} when crossing streets
															</p>
														)}
												</CardBody>
											</Card>
										</Col>
										<Col xs="10" sm="4">
											<Card header = "Unsafe Areas"
												>
												<CardBody>
													<div
														className="scrolling-card"
														style={{ maxHeight: '285px', overflow: 'scroll' }}
														dangerouslySetInnerHTML={{ __html: unsafeAreas }}
													/>
												</CardBody>
											</Card>
										</Col>
									</Row>
								</div>
								<div className="section">
									<Subtitle text="Health & Safety" />
								</div>
							</ReactFullpage.Wrapper>
						);
					}}
				/>
			)}
		</div>
	);
}

export default Country;
