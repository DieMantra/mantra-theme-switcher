## React Theme Switcher

This is a simple theme switcher for React. It uses the Context API to provide a theme to the entire application.
@example site: https://mantra-theme-switcher.vercel.app/

### Installation

```bash
npm install mantra-theme-switcher
```

### Usage main.tsx

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'mantra-theme-switcher';
import App from './App';

// ThemeContextSettings is optional
// These are the default settings
const ThemeContextSettings = {
  initialState: "light",
  matchDevicePreference: "initialy"
  savePreference: true,
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ThemeContextProvider settings={ThemeContextSettings}>
				<App />
			</Provider>
	</React.StrictMode>
);

```

### Usage SomeComponent.tsx

```jsx
import React from 'react';
import { useTheme } from 'mantra-theme-switcher';

const SomeComponent = () => {
	const { theme, toggleTheme, isDark, isLight } = useTheme();

	return (
		<div>
			<h1>Current theme: {theme}</h1>
			<button onClick={() => toggleTheme('light')}>Set theme to light</button>
			<button onClick={() => toggleTheme('dark')}>Set theme to dark</button>
			{isDark ? <p>Help it's dark in here!</p> : <p>Actually it's light!</p>}
		</div>
	);
};
```

### Usage in css

```css
:root {
	--background: #fff;
	--text: #000;
}

html[data-theme='dark'] :root {
	--background: #000;
	--text: #fff;
}
```

### Usage in Sass

```scss
$lightMode-background: #fff;
$darkMode-background: #000;

$lightMode-text: #000;
$darkMode-text: #fff;

@mixin dark {
	html[data-theme='dark'] & {
		@content;
	}
}
@mixin dark-hover {
	html[data-theme='dark'] &:hover {
		@content;
	}
}
@mixin dark-active {
	html[data-theme='dark'] &:active {
		@content;
	}
}

body {
	background: $lightMode-background;
	color: $lightMode-text;

	@include dark {
		background: $darkMode-background;
		color: $darkMode-text;
	}
}

.button {
	background: $lightMode-background;

	&:hover {
		background: lighten($lightMode-background, 10%);
	}

	@include dark {
		background: $darkMode-background;
	}

	@include dark-hover {
		background: lighten($darkMode-background, 10%);
	}
}
```

### Settings

| Name                  | Type                        | Default    | Description                                                                                                                                                                                                                                      |
| --------------------- | --------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| initialState          | "light" "dark" "init"       | "light"    | The initial theme to use. (Bypassed if there is a preference in localStorage or matchDevicePreference is activated)                                                                                                                              |
| matchDevicePreference | "initialy" "always" "never" | "initialy" | Match the device preference. ("initialy" = if the device theme switches during session, the theme won't be changed. "always" = the theme will change whenever the devices theme changes. "never" = the theme will never change with the device.) |
| savePreference        | boolean                     | true       | Save the preference in local storage.                                                                                                                                                                                                            |
