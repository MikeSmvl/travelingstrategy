import React, { Component } from 'react';
import CountrySearch from './Search';

class Home extends Component {

	render() {
		return(
			<div style={{ margin: '100px' }}>
				<CountrySearch/>
			</div>
		);
	}
}

export default Home;