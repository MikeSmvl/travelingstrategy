import * as React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import { Card } from 'react-bootstrap/';

function App() {
	return (
		<div>
			<div className="App">
				<div className="App-header" style={{ height: '420px' }}>
					<Navbar />
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
		</div>
	);
}

export default App;
