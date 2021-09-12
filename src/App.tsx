import React from "react";
import Routes from "./routes/Routes";
import { jssPreset, StylesProvider, ThemeProvider as MuiThemeProvider} from "@material-ui/core/styles";
import { create } from "jss";
import { ThemeProvider } from "styled-components/macro";
import { THEMES } from "./constants";
import createTheme from "./theme";

import {Helmet, HelmetProvider} from "react-helmet-async";

const jss = create({
	...jssPreset(),
	insertionPoint: document.getElementById("jss-insertion-point")!
})

function App() {

	const [currentTheme, setCurrentTheme] = React.useState(THEMES.DEFAULT);

	//Do not use second context to change theme but a singular switch or just a checkbox

	return (
		<HelmetProvider>
			<Helmet titleTemplate={"Dummy Project"} defaultTitle={"Dummy"}/>

			<StylesProvider jss={jss}>
				<MuiThemeProvider theme={createTheme(currentTheme)} >
					<ThemeProvider theme={createTheme(currentTheme)} >
						<Routes/>
					</ThemeProvider>
				</MuiThemeProvider>
			</StylesProvider>

		</HelmetProvider>
	);
}

export default App;
