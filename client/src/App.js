import * as React from 'react';
import './App.css';
import { Card, Navbar } from 'react-bootstrap/';
import logo from './logo.png';

function App() {
	return (
		<body>
			<div className="App">
				<div className="App-header" style={{ height: '420px' }}>
					<Navbar variant="dark" style={{ backgroundColor: 'transparent' }}>
						<Navbar.Brand href="#home">
							<img
								alt=""
								src={logo}
								width="45"
								height="45"
								className="d-inline-block align-top"
							/>
							<Navbar.Text style={{ color: 'white' }}>
								Traveling Strategy
							</Navbar.Text>
						</Navbar.Brand>
						<Navbar.Collapse className="justify-content-end">
							<Navbar.Text>
								<a href="#login">Login</a>
							</Navbar.Text>
						</Navbar.Collapse>
					</Navbar>
					<div
						style={{
							textAlign: 'center',
							paddingTop: '110px'
						}}
					>
						<span
							style={{
								color: 'white',
								fontSize: '33px',
								fontWeight: '750'
							}}
						>
							Paris
						</span>
						<span
							style={{
								color: 'white',
								fontSize: '23px',
								fontWeight: '600',
								display: 'block'
							}}
						>
							France
						</span>
					</div>
				</div>
			</div>
			<div style={{ padding: '20px' }}>
				<Card style={{ color: 'grey' }}>
					<Card.Body>This is some text within a card body.</Card.Body>
				</Card>
			</div>
		</body>
	);
}

export default App;
