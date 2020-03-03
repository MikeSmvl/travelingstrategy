import * as React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useLocation,
	Redirect
} from 'react-router-dom';
import Home from './pages/Home';
import Country from './pages/Country';
import Navbar from './components/Navbar/Navbar';
import Me from './pages/Me';
import TrendingSpots from './pages/TrendingSpots';
import Events from './pages/Events';

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
				hrefBrand="/"
			/>
			<Switch>
				<Route exact path="/">
					<Route exact path="/" component={Home} />
				</Route>
				<Route path="/country">
					<Country
						originCountry={query.get('originCountry')}
						destinationCountry={query.get('destinationCountry')}
						originCity={query.get('originCity')}
						destinationCity={query.get('destinationCity')}
						originLat={query.get('originLat')}
						originLng={query.get('originLng')}
						destinationLat={query.get('destinationLat')}
						destinationLng={query.get('destinationLng')}
					/>
				</Route>
				<Route path="/me">
					<Me />
				</Route>
				<Route path="/trending_spots">
					<TrendingSpots
						city={query.get('city')}
						latitude={query.get('latitude')}
						longitude={query.get('longitude')}

					 />
				</Route>
				<Route path="/events">
					<Events
						latitude={query.get('latitude')}
						longitude={query.get('longitude')}
					 />
				</Route>
				<Route>
					<Redirect to="/" />;
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
