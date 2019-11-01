import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import Country from './pages/Country';

function App() {
	return (
    <Router>
      <div>
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
