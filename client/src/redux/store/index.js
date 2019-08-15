import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const middlewares = [sagaMiddleware];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
  }

  const store = createStore(rootReducer, undefined, composeEnhancers(applyMiddleware(...middlewares)));

  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
