import React from "react";
import Routes from "./routes/Routes";
import ThemeContextProvider from "./context/ThemeContextProvider";

import { Helmet, HelmetProvider } from "react-helmet-async";
import { SnackbarProvider } from "notistack";
import { useCustomTranslation } from "./context/LangContextProvider";
import SectionContextProvider from "./context/SectionContextProvider";

function App() {

	const { t } = useCustomTranslation();

	return (
		<HelmetProvider>
			<Helmet defaultTitle={t("common:general.appTitle")} />

			<ThemeContextProvider>
				<SnackbarProvider
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
				>
					<SectionContextProvider>
						<Routes />
					</SectionContextProvider>
				</SnackbarProvider>
			</ThemeContextProvider>

		</HelmetProvider>
	);
}

export default App;
