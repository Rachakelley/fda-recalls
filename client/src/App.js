import React, { Suspense, lazy } from 'react';
import './App.css';
import Header from './components/Header/Header';

const FDARecalls = lazy(() => import('./components/FDARecalls/FDARecalls'));

function App() {
	return (
		<div className='App'>
			<Header />
			<main className='App-main'>
				<Suspense fallback={<div>Loading...</div>}>
					<FDARecalls />
				</Suspense>
			</main>
		</div>
	);
}

export default App;
