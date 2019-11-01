import * as React from 'react';
import Navbar from '../components/Navbar/Navbar';
import SearchBar from '../components/CountrySelector/SearchBar';

function Home() {
	return (
		<div>
			<Navbar
				title="Traveling Strategy"
				textRight="Login"
				hrefBrand="#home"
				hrefRight="#login"/>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<SearchBar></SearchBar>
		</div>
		
		
		
	);
}

export default Home;
