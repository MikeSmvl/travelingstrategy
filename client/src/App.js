import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import DropdownExampleSearchSelection from './components/CountrySelector/CountrySelector';
import Country from './pages/Country';
//import Home from './pages/Home';
import Home from'./components/Home/Home';

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
