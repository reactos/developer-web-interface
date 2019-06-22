import React from 'react';
import { Provider } from 'react-redux';
import Header from './components/Header';
import TabEX from './components/TabEX';
import configureStore from './redux/store';
const store = configureStore();

function App() {
 return (
  <Provider store={store}>
   <div>
    <Header />
    <TabEX />
   </div>
  </Provider>
 );
}

export default App;
