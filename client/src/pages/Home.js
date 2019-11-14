import * as React from 'react';
import CountrySelector from '../components/CountrySelector/CountrySelector';
import Hero from '../components/Hero/Hero';

function Home() {
	return (
		<div>
			<Hero />
			<CountrySelector originLabel="Origin" destinationLabel="Destination" />
		</div>
	);
}

export default Home;
