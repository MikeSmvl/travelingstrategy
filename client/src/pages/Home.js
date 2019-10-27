import * as React from 'react';
import Navbar from '../components/Navbar/Navbar';

function Home() {
	return (
		<div>
			<Navbar
				title='Traveling Strategy'
				textRight='Login'
				hrefBrand='#home'
				hrefRight='#login'
			/>
		</div>
	);
}

export default Home;
