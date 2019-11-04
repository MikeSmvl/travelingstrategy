import * as React from 'react';
import CountrySelector from '../components/CountrySelector/CountrySelector';
import Hero from '../components/Hero/Hero'

function Home() {
	return (
		<div>
				<Hero></Hero>
				<CountrySelector></CountrySelector>
		</div>
	);
}

export default Home;
