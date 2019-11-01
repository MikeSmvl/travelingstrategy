import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import Country from './pages/Country';
import SearchBar from './components/CountrySelector/SearchBar';

function App() {
	return (
    <Router>
      <body>
        <Switch>
          <Route exact path="/">
          <div>
						<Route exact path="/" component={Home} />
					</div>
          </Route>
          <Route path="/country">
            <Country />
          </Route>
        </Switch>
      </body>
    </Router>
	);
}

export default App;
