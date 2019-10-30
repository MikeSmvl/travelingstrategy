import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import DropdownExampleSearchSelection from './components/CountrySelector/CountrySelector';
import Country from './pages/Country';
import Home from './pages/Home';

function App() {
	return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
          <DropdownExampleSearchSelection />
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
