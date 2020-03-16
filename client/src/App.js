import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { connect } from 'react-redux'
import Header from './components/Header';
import Commits from './components/Commits';
import Pulls from './components/Pulls';
import Loading from './components/Loading'
import configureStore from './redux/store';
import { loadBuilders } from './redux/actions'
import { LOAD_STATE } from './redux/constants'


const store = configureStore();

class App extends React.PureComponent {
  // things which are needed regardles the current view
  componentDidMount() {
    this.props.dispatch(loadBuilders())
  }

  render() {
    return (
      <React.Fragment>
        <Header/>
        {this.props.canRender ?
          <Switch>
            <Route path="/pulls/:pull_state"><Pulls/></Route>
            <Route path="/commits/:branch"><Commits/></Route>

            <Route path="/pulls"><Redirect to="/pulls/open"/></Route>
            <Route path="/commits"><Redirect to="/commits/master"/></Route>
            <Route path="/"><Redirect to="/commits/master"/></Route>
          </Switch>
        : <Loading text="Loading basic data..." />}
      </React.Fragment>)
  }
}

function mapStateToProps(state) {
  return ({canRender: state.isLoading.buildersDataState === LOAD_STATE.LOADED})
}

const WrappedApp = connect(mapStateToProps)(App)

export default function outerApp() {
  return (
    <Provider store={store}>
      <Router>
        <WrappedApp />
      </Router>
    </Provider>
  );
};
