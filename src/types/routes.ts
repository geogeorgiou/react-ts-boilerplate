import { ComponentClass } from "react";

export type RouteType = {
	id: string;
	path: string;
	icon?: JSX.Element;
	children: null | Array<RouteChildType>;
	component: ComponentClass<any> | null;
	badge?: string | boolean;
	containsHome?: boolean;
	open?: boolean;
	header?: string;
	guard?: ComponentClass<any>
}

export type RouteChildType = {
	path: string;
	name: string;
	icon?: JSX.Element;
	component: ComponentClass<any>;
	badge?: string | boolean;
	hidden?: boolean;
	guard?: ComponentClass<any>;
	omitFromHomepage?: boolean;
}