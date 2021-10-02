import React from "react";
import Routes from "./routes/Routes";
import ThemeContextProvider from "./context/ThemeContextProvider";

import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {

	return (
		<HelmetProvider>
			<Helmet titleTemplate={"Dummy Project"} defaultTitle={"Dummy"} />

			<ThemeContextProvider>
				<Routes />
			</ThemeContextProvider>

		</HelmetProvider>
	);
}

export default App;
