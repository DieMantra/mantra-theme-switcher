import React, { ReactNode, useEffect, useState } from 'react';
import ThemeContext, { ThemeContextProps } from './theme-context';

const LOCAL_THEME = 'data-theme';

const THEME_ATTR = LOCAL_THEME;

interface ThemeContextProviderProps {
	children: ReactNode;
	settings?: {
		initialState?: ThemeContextProps['theme'];
		matchDevicePreference?: 'initialy' | 'always' | 'never';
		savePreference?: boolean;
	};
}

const DEFAULT_SETTINGS: NonNullable<ThemeContextProviderProps['settings']> = {
	initialState: 'light',
	matchDevicePreference: 'initialy',
	savePreference: true,
};

const reMapSettings = (
	settings: NonNullable<ThemeContextProviderProps['settings']>
) => {
	for (const key in settings) {
		const typedKey: keyof typeof settings = key as any;
		if (Object.prototype.hasOwnProperty.call(settings, typedKey)) {
			// cant fix this error
			DEFAULT_SETTINGS[typedKey] = settings[typedKey] as never;
		}
	}
};

const setAttribute = (value: ThemeContextProps['theme']): void => {
	const html = document.documentElement;
	html.setAttribute(THEME_ATTR, value);
};

const setLocalStorage = (value: ThemeContextProps['theme']): void => {
	localStorage.setItem(LOCAL_THEME, value);
};

const checkLocalStorage = (): ThemeContextProps['theme'] | undefined => {
	const store =
		typeof localStorage.getItem(LOCAL_THEME) === 'undefined'
			? undefined
			: (localStorage.getItem(LOCAL_THEME) as ThemeContextProps['theme']);
	return store;
};

/**
 * This wraps your app and provides the theme context to your app.
 * Customize using your own settings.
 *
 * @param {ThemeContextProviderProps} props - Props for the ThemeProvider component.
 * @param {ReactNode} props.children - The children of the ThemeProvider component.
 * @param {ThemeContextProviderProps['settings']} [props.settings] - The settings for the ThemeProvider component.
 * @example // file: main.tsx /
 *
 * import React from 'react';
 * import ReactDOM from 'react-dom/client';
 * import { ThemeProvider } from 'mantra-theme-switcher';
 * import App from './App';
 *
 * // ThemeContextSettings is optional
 * // These are the default settings
 * const ThemeContextSettings = {
 *   initialState: "light",
 *   matchDevicePreference: "initialy"
 *   savePreference: true,
 * }
 *
 * ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
 * 	<React.StrictMode>
 * 		<ThemeContextProvider settings={ThemeContextSettings}>
 * 				<App />
 * 			</Provider>
 * 	</React.StrictMode>
 * );
 * @return {JSX.Element} A JSX element with the ThemeProvider component.
 */
const ThemeProvider = ({ children, settings }: ThemeContextProviderProps) => {
	if (settings) {
		reMapSettings(settings);
	}
	const [theme, setTheme] = useState<ThemeContextProps['theme']>('light');

	const localStoragePreference = DEFAULT_SETTINGS.savePreference
		? checkLocalStorage()
		: undefined;
	const initialState = DEFAULT_SETTINGS.initialState
		? DEFAULT_SETTINGS.initialState
		: 'light';

	const toggleTheme: ThemeContextProps['toggleTheme'] = (value) => {
		let newTheme: ThemeContextProps['theme'];
		if (value) {
			newTheme = value;
		} else {
			newTheme = theme === 'dark' ? 'light' : 'dark';
		}
		setTheme(newTheme);
		setAttribute(newTheme);
		if (DEFAULT_SETTINGS.savePreference) {
			setLocalStorage(newTheme);
		}
	};

	useEffect(() => {
		// Setup an event listener on the window for matching the media on initial load
		let darkModeMediaQuery: MediaQueryList;
		let handleChange: (e: MediaQueryListEvent) => void;
		if (
			DEFAULT_SETTINGS.matchDevicePreference !== 'never' &&
			!localStoragePreference
		) {
			if (DEFAULT_SETTINGS.matchDevicePreference === 'always') {
				darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
				handleChange = (e: MediaQueryListEvent) => {
					const newColorScheme = e.matches ? 'dark' : 'light';
					toggleTheme(newColorScheme);
				};
				darkModeMediaQuery.addEventListener('change', handleChange);
			}
			const newColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
				.matches
				? 'dark'
				: 'light';
			toggleTheme(newColorScheme);
		} else {
			toggleTheme(
				localStoragePreference ? localStoragePreference : initialState
			);
		}
		return () => {
			if (darkModeMediaQuery) {
				darkModeMediaQuery.removeEventListener('change', handleChange);
			}
		};
	}, []);

	const isDark = theme === 'dark';
	const isLight = theme === 'light';

	return (
		<ThemeContext.Provider
			value={{
				theme,
				isDark,
				isLight,
				toggleTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
