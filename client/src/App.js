import React from 'react';
import { Provider } from 'react-redux';
import Header from './components/Header';
import Commit from './components/Commit';
import configureStore from './redux/store';
const store = configureStore();

function App() {
	return (
		<Provider store={store}>
			<div>
				<Header />
				<Commit />
			</div>
		</Provider>
	);
}

export default App;
