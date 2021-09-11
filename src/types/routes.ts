import React from "react";

export type RouteType = {
	id: string;
	path: string;
	icon?: JSX.Element;
	children: null | Array<RouteChildType>;
	component: React.ComponentClass<any> | null;
	badge?: string | boolean;
	containsHome?: boolean;
	open?: boolean;
	header?: string;
	guard?: React.ComponentClass<any>
}

export type RouteChildType = {
	path: string;
	name: string;
	icon?: JSX.Element;
	component: React.ComponentClass<any>;
	badge?: string | boolean;
	hidden?: boolean;
	guard?: React.ComponentClass<any>;
	omitFromHomepage?: boolean;
}