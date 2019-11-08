import * as React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import {Card, CardBody} from '../components/Card/Card';
import Navbar from '../components/Navbar/Navbar';
import Header from '../components/Header/Header';
import '../App.css';

function Country() {
	return (
		<div>
			<Navbar
				title="Traveling Strategy"
				textRight="Login"
				hrefBrand="#home"
				hrefRight="#login"
			/>
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
								<div style={{ padding: '20px' }}>
									<Card><CardBody>hoi</CardBody></Card>
								</div>
								<p>Basics</p>
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
