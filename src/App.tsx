import React from "react";
import Routes from "./routes/Routes";
import { jssPreset, StylesProvider, ThemeProvider } from "@material-ui/styles";
import { create } from "jss";
import { THEMES } from "./constants";
import createTheme from "./theme";

const jss = create({
	...jssPreset(),
	insertionPoint: document.getElementById("jss-insertion-point")!
})

function App() {

	const [currentTheme, setCurrentTheme] = React.useState(THEMES.DEFAULT);

	return (
		<StylesProvider jss={jss}>
			<ThemeProvider theme={createTheme(currentTheme)}>
				<Routes/>
			</ThemeProvider>
		</StylesProvider>
	);
}

export default App;
