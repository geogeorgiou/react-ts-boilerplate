import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { EnhancedI18Provider } from "./context/LangContextProvider";
import { LinearProgress } from "@material-ui/core";
import StylesProvider from "@material-ui/styles/StylesProvider";


const WrappedApp = () => (
	<Suspense fallback={<LinearProgress />}>
		<StylesProvider injectFirst>
			<EnhancedI18Provider>
				<App />
			</EnhancedI18Provider>
		</StylesProvider>
	</Suspense>
)

ReactDOM.render(
	<WrappedApp/>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
