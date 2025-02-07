import React, { lazy, Suspense, useContext } from 'react';
import { ThemeContextProvider, ThemeContext } from './context/ThemeContext';
import Header from './components/Header/Header';
import './App.css';
const FDARecalls = lazy(() => import('./pages/FDARecalls/FDARecalls'));

function AppContent() {
	const { mode } = useContext(ThemeContext);

	return (
		<div className={`App ${mode}`}>
			<Header />
			<main className='App-main'>
				<Suspense fallback={<div>Loading...</div>}>
					<FDARecalls />
				</Suspense>
			</main>
		</div>
	);
}

function App() {
	return (
		<ThemeContextProvider>
			<AppContent />
		</ThemeContextProvider>
	);
}

export default App;
