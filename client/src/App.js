import * as React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useLocation
} from 'react-router-dom';
import Home from './pages/Home';
import Country from './pages/Country';
import Navbar from './components/Navbar/Navbar';

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function Application() {
	const query = useQuery();

	return (
		<div>
			<Navbar
				title="Traveling Strategy"
				textRight="Login"
				hrefBrand="/"
				hrefRight="#login"
			/>
			<Switch>
				<Route exact path="/">
					<Route exact path="/" component={Home} />
				</Route>
				<Route path="/country">
					<Country originCountry={query.get('originCountry')} destinationCountry={query.get('destinationCountry')} originCity={query.get('originCity')} destinationCity={query.get('destinationCity')}/>
				</Route>
			</Switch>
		</div>
	);
}

export default function App() {
	return (
		<Router>
			<Application />
		</Router>
	);
}
