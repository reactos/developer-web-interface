import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Header from './components/Header';
import Commits from './components/Commits';
import Pulls from './components/Pulls';
import configureStore from './redux/store';
const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Header/>
          <Switch>
            <Route path="/pulls/:pull_state"><Pulls/></Route>
            <Route path="/commits/:branch"><Commits/></Route>

            <Route path="/pulls"><Redirect to="/pulls/open"/></Route>
            <Route path="/commits"><Redirect to="/commits/master"/></Route>
            <Route path="/"><Redirect to="/commits/master"/></Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};
