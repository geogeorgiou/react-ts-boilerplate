import React from "react";
import Routes from "./routes/Routes";
import ThemeContextProvider from "./context/ThemeContextProvider";
import LangContextProvider from "./context/LangContextProvider";

import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {

	return (
		<LangContextProvider>
			<HelmetProvider>
				<Helmet titleTemplate={"Dummy Project"} defaultTitle={"Dummy"} />

				<ThemeContextProvider>
					<Routes />
				</ThemeContextProvider>

			</HelmetProvider>
		</LangContextProvider>
	);
}

export default App;
