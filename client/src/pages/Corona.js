import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-6';
import { Row, Col, InputGroup, Form } from 'react-bootstrap';
import CoronaHeader from '../components/CoronaHeader/CoronaHeader';
import getCountryName from '../utils/ISOToCountry';

function Corona() {
	const [tableData, setTableData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [search, setSearch] = useState('');
	const columns = [
		{
			Header: 'Country',
			accessor: 'country'
		},
		{
			Header: 'Total Cases',
			accessor: 'totalcases'
		},
		{
			Header: 'Active Cases',
			accessor: 'activecases'
		},
		{
			Header: 'New Cases',
			accessor: 'newcases'
		},
		{
			Header: 'Total Deaths',
			accessor: 'totaldeaths'
		},
		{
			Header: 'New Deaths',
			accessor: 'newdeaths'
		},
		{
			Header: 'Total Recovered',
			accessor: 'totalrecovered'
		},
		{
			Header: 'Serious Critical',
			accessor: 'seriouscritical'
		}
	];

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			await fetch(`${process.env.REACT_APP_BACKEND}graphql`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `{
						covidAllStats {
							country
							totalcases
							newcases
							totaldeaths
							newdeaths
							totalrecovered
							activecases
							seriouscritical
						  }
					}`
				})
			})
				.then((res) => res.json())
				.then((res) => {
					if (res.data.covidAllStats) {
						const covidDataCopy = res.data.covidAllStats.slice();
						Object.keys(covidDataCopy).forEach((key) => {
							covidDataCopy[key].country = getCountryName(covidDataCopy[key].country);
						});
						covidDataCopy
						&& covidDataCopy.length !== 0
						&& setTableData(covidDataCopy);
						setIsLoading(false);
					}
				});
		}

		fetchData();
	}, []);

	let data = tableData;
	if (search) {
		data = tableData.filter((row) => {
			return row.country.toLowerCase().includes(search.toLowerCase());
		});
		document.getElementsByClassName('rt-tbody')[0].scrollTop = 0;
	}

	return (
		<div>
			<CoronaHeader />
			{!isLoading
			&& (
				<Row className="justify-content-center">
					<Col xs={12} lg={8}>
						<InputGroup className="SearchBar">
							<InputGroup.Prepend>
								<InputGroup.Text id="inputGroupPrepend"><span className="fa fa-search" /></InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								type="text"
								placeholder="Search..."
								aria-describedby="inputGroupPrepend"
								onChange={(e) => setSearch(e.target.value)}
							/>
						</InputGroup>
						<ReactTable
							data={data}
							columns={columns}
							defaultPageSize={data.length}
							showPagination={false}
							className="-highlight"
							style={{ height: '800px' }}
						/>
					</Col>
				</Row>
			)}
		</div>
	);
}

export default Corona;
