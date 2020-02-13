import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
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
            <Route path="/pulls"><Pulls/></Route>
            <Route path="/"><Commits/></Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};
