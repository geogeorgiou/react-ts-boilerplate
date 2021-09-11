import React from "react";
import async from "../components/Async";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { RouteType } from "../types/routes";

//sign in page
const SignInPage = async(() => import("../pages/auth/SignIn"));

//defining authRoutes
const authRoutes: RouteType = {
	id: "Auth",
	path: "/auth",
	icon: <PeopleAltIcon />,
	children: [
		{
			path: "/auth/sign-in",
			name: "Sign In",
			component: SignInPage
		}
	],
	component: null
};

//defining authRoutes config
export const authLayoutRoutes = [authRoutes]