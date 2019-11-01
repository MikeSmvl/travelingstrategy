import * as React from 'react';
import Navbar from '../components/Navbar/Navbar';
import SearchComponents from '../components/CountrySelector/SearchComponents';


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
				<SearchComponents></SearchComponents>
				
		</div>
		
		
		
	);
}

export default Home;
