import { createBrowserHistory } from "history";
import { Route, RouteComponentProps, Router, Switch } from "react-router-dom";
import React, { Component } from "react";
import { RouteType } from "../types/routes";
import AuthLayout from "../layouts/AuthLayout";
import { authLayoutRoutes } from "./index";


export const browserHistory = createBrowserHistory({
	basename: process.env.PUBLIC_URL
});

//Route and ChildRoute generator
const childRoutes = (Layout: React.ElementType, routes: Array<RouteType>) =>
	routes.map(({ component: Component, guard, children, path }, index: number) => {
		const Guard = guard || React.Fragment;
		return children ? (
				children.map((element, index) => {
					const GuardInner = element.guard || Guard || React.Fragment;

					return (
						<Route
							key={index}
							path={element.path}
							exact
							render={(props: RouteComponentProps) => (
								<GuardInner>
									<Layout>
										<element.component {...props} />
									</Layout>
								</GuardInner>
							)}
						/>
					);
				})
			) :
			Component ? (
				<Route
					key={index}
					path={path}
					exact
					render={(props) => (
						<Guard>
							<Layout>
								<Component {...props} />
							</Layout>
						</Guard>
					)}
				/>
			) : null;
	});


const Routes = () => {

	return (
		<Router history={browserHistory}>
			<Switch>
				{childRoutes(AuthLayout, authLayoutRoutes)}
			</Switch>
		</Router>
	);
};

export default Routes;