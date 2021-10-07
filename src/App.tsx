import React from "react";
import Routes from "./routes/Routes";
import ThemeContextProvider from "./context/ThemeContextProvider";

import { Helmet, HelmetProvider } from "react-helmet-async";
import { SnackbarProvider } from "notistack";

function App() {

	return (
		<HelmetProvider>
			<Helmet titleTemplate={"Dummy Project"} defaultTitle={"Dummy"} />

			<ThemeContextProvider>
				<SnackbarProvider
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
				>
					<Routes />
				</SnackbarProvider>
			</ThemeContextProvider>

		</HelmetProvider>
	);
}

export default App;
