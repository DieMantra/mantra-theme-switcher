import { createContext } from 'react';

export interface ThemeContextProps {
	theme: 'dark' | 'light';
	isDark: boolean;
	isLight: boolean;
	toggleTheme: (value?: ThemeContextProps['theme']) => void;
}

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
