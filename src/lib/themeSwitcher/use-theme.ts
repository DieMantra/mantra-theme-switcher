import { useContext } from 'react';
import ThemeContext from './theme-context';

/**
 * @example
 * import React from 'react';
 * import { useTheme } from 'mantra-theme-switcher';
 *
 * const SomeComponent = () => {
 * 	const { theme, toggleTheme, isDark, isLight } = useTheme();
 *
 * 	return (
 * 		<div>
 * 			<h1>Current theme: {theme}</h1>
 * 			<button onClick={() => toggleTheme('light')}>Set theme to light</button>
 * 			<button onClick={() => toggleTheme('dark')}>Set theme to dark</button>
 * 			{isDark ? <p>Help it's dark in here!</p> : <p>Actually it's light!</p>}
 *
 * 			<button onClick={() => toggleTheme()} >Toggle between themes</button>
 * 		</div>
 * 	);
 * };
 *
 * @return {*}
 */
const useTheme = () => {
	return useContext(ThemeContext);
};

export default useTheme;
