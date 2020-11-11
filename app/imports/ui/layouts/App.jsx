import React from 'react';
import 'semantic-ui-css/semantic.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from '../components/NavBar';

import HistoryView from '../pages/HistoryView';
import MapView from '../pages/MapView';
import Landing from '../pages/Landing';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/map" component={MapView}/>
              <Route path="/history" component={HistoryView}/>
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
