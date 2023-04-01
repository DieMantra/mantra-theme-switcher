import { createContext } from 'react';

export interface ThemeContextProps {
	theme: 'dark' | 'light';
	isDark: boolean;
	isLight: boolean;
	toggleTheme: (value?: ThemeContextProps['theme']) => void;
}

/**
 * The toggle theme should just switch between the themes by default, but it can also be used to set a specific theme.
 * @typedef {Object} ThemeContextProps
 * @property {'dark' | 'light'} theme - The current theme
 * @property {boolean} isDark - Whether the current theme is dark
 * @property {boolean} isLight - Whether the current theme is light
 * @property {(value?: 'dark' | 'light') => void} toggleTheme - Function to toggle between the two themes
 */
const contextInitialState = {
	theme: 'light',
	isDark: false,
	isLight: false,
	toggleTheme: (value?: ThemeContextProps['theme']) => {
		value;
	},
} as ThemeContextProps;
const ThemeContext = createContext<ThemeContextProps>(contextInitialState);

export default ThemeContext;
