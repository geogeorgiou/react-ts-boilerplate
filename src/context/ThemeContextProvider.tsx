import React, { createContext, useContext, useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/styles";
import createTheme from "../theme";
import { ThemeProvider } from "styled-components/macro";
import { jssPreset, StylesProvider } from "@material-ui/core/styles";
import { THEME } from "../constants";
import { create } from "jss";

const jss = create({
	...jssPreset(),
	insertionPoint: document.getElementById("jss-insertion-point")!
})

type StylesContextProviderState = {
	currentTheme: THEME,
	setCurrentTheme: (arg: THEME) => void
}

const defaultStateValue: StylesContextProviderState = {
	currentTheme: THEME.DEFAULT,
	setCurrentTheme: (currentTheme: THEME) => console.warn("no StylesContextProviderState")
}

const IThemeContext = createContext<StylesContextProviderState>({
	...defaultStateValue
})

//custom hook to use in order to fetch context (use this only to access context)
export const useTheme = () => useContext(IThemeContext);

const ThemeContextProvider: React.FC = ({ children }) => {

	const [currentTheme, setCurrentTheme] = useState(THEME.DEFAULT);

	return (
		<StylesProvider jss={jss}>
			<IThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
				<MuiThemeProvider theme={createTheme(currentTheme)} >
					<ThemeProvider theme={createTheme(currentTheme)} >
						{children}
					</ThemeProvider>
				</MuiThemeProvider>
			</IThemeContext.Provider>
		</StylesProvider>
	);

};


export default ThemeContextProvider;