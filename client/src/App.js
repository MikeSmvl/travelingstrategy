import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import Country from './pages/Country';
import Navbar from './components/Navbar/Navbar';

function App() {
	return (
    <Router>
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
            <Country />
          </Route>
        </Switch>
        </div>
    </Router>
	);
}

export default App;
