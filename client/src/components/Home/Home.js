import React, { Component } from 'react';
import Search from './Search';

class Home extends Component {

	render() {
		return(
			<div style={{ margin: '100px' }}>
				<SearchBar/>
			</div>
		);
	}
}

export default Home;