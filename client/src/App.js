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
	let query = useQuery();
	console.log(query)

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
						<Country origin={query.get("origin")} destination={query.get("destination")} />
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
