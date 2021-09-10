import { createBrowserHistory } from "history";
import { Router, Route } from "react-router-dom";
import React from "react";


export const browserHistory = createBrowserHistory({
	basename: process.env.PUBLIC_URL
})

// const childRoutes = (Layout: Element.Type, routes: Array<RouteType>) => (
// 	routes.map(({component: Component, guard, children}))
// )

const Routes = () => {

	return (
		<Router history={browserHistory}>
			<Route
				render={() => (
					<div>Hello Router!</div>
				)}
			/>
		</Router>
	)
}

export default Routes;