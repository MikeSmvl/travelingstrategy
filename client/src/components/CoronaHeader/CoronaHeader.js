import React, { useState, useEffect } from 'react';
import './CoronaHeader.css';
import { Row, Col } from 'react-bootstrap';
import CountUp from 'react-countup';

function CoronaHeader() {
	const [covidStats, setCovidStats] = useState({
		total_cases: 0,
		total_deaths: 0,
		total_recovered: 0,
		serious_critical: 0
	});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			await fetch(`${process.env.REACT_APP_BACKEND}graphql`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `{
                        covidStats {
                            total_cases
                            total_deaths
                            serious_critical
                            total_recovered
                        }
					}`
				})
			})
				.then((res) => res.json())
				.then((res) => {
					res.data.covidStats
            && res.data.covidStats.length !== 0
            && setCovidStats(res.data.covidStats[0]);
					setIsLoading(false);
				});
		}

		fetchData();
	}, []);

	const handleScroll = () => {
		window.scrollTo({
			top: 1000,
			behavior: 'smooth'
		});
	};

	return (
		<div>
			{!isLoading && (
				<>
					<div className="hero-image">
						<div className="hero-text">
							<h1>Covid-19 Stats</h1>
						</div>
					</div>
					<Row className="justify-content-center">
						<Col xs={6}>
							<div className="covid-stats">
								<Row className="justify-content-center">
									<Col xs={12} sm={6} md={6} lg={6} xl={3}>
										<CountUp
											className="covid-stat-number"
											end={covidStats.total_cases}
											duration={2}
											separator=","
										/>
										<p className="total_cases">Total Cases</p>
									</Col>
									<Col xs={12} sm={6} md={6} lg={6} xl={3}>
										<CountUp
											className="covid-stat-number"
											end={covidStats.total_deaths}
											duration={2}
											separator=","
										/>
										<p className="total_deaths">Total Deaths</p>
									</Col>
									<Col xs={12} sm={6} md={6} lg={6} xl={3}>
										<CountUp
											className="covid-stat-number"
											end={covidStats.serious_critical}
											duration={2}
											separator=","
										/>
										<p className="total_critical">Total Critical</p>
									</Col>
									<Col xs={12} sm={6} md={6} lg={6} xl={3}>
										<CountUp
											className="covid-stat-number"
											end={covidStats.total_recovered}
											duration={2}
											separator=","
										/>
										<p className="total_recovered">Total Recovered</p>
									</Col>
								</Row>
								<p style={{ marginTop: '30px', marginBottom: '-30px' }}>
                  Last Updated: 1 hour ago
								</p>
							</div>
						</Col>
					</Row>
					<div className="more-stats">
						<Row className="justify-content-center">
							<Col md="auto">
								<p>Scroll Down</p>
								<p>for More Information</p>
							</Col>
							<Col xs={12}>
								<button
									type="button"
									onClick={handleScroll}
									className="scroll-down-button fa fa-arrow-circle-down"
								/>
							</Col>
						</Row>
					</div>
				</>
			)}
		</div>
	);
}

export default CoronaHeader;
