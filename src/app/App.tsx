import { useTheme } from '../lib/index';
import './App.css';
function App() {
	const { toggleTheme, isDark, isLight } = useTheme();
	return (
		<div className='App'>
			<button className='button' onClick={() => toggleTheme()}>
				Toggle Theme
			</button>
			{isDark && <h1>Is dark mode</h1>}
			{isLight && <h1>Is light mode</h1>}
		</div>
	);
}

export default App;
