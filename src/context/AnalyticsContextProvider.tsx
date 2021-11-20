import React, { createContext, useContext, useEffect, useReducer } from "react";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";
import { isProductionMode } from "../constants";

const GOOGLE_ANALYTICS_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_ID+""; //coerce to defined
const FACEBOOK_PIXEL_ID = process.env.REACT_APP_FACEBOOK_PIXEL_ANALYTICS_ID+""; //coerce to defined

//some variable assignment here
// const advancedMatching = { em: 'georgiogeo27@gmail.com' }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching
const options = {
	autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
	debug: false // enable logs
};

/**
 * Analytics initialization function to use (production only func)
 *
 */
function initializeAnalytics(){
	if (isProductionMode()){
		//GA INIT
		ReactGA.initialize(GOOGLE_ANALYTICS_ID, {
			gaOptions: {
				siteSpeedSampleRate: 100
			}
		});
		//FB TRACK INIT
		ReactPixel.grantConsent();
	}
}

function pageLinkAnalytics(link: string) {
	if (isProductionMode()) {
		//GA VIEW
		ReactGA.send({ hitType: "pageview", page: link })
	}
}

export const INIT = 'analytics/init';
export const PAGE_LINK = 'analytics/pageLink';

type Action<T> = {
	type: T
}

//describing Action Creators
interface InitAction extends Action<typeof INIT> {}

interface PageLinkAction extends Action<typeof PAGE_LINK> {
	payload: {
		link: string;
	}
}

type AnalyticsContextState = {
	hasConsented: boolean,
}

const defaultStateValue: AnalyticsContextState = {
	hasConsented: false,
};

//Lang context export no need to use this atomically
const AnalyticsStateContext = createContext({
	...defaultStateValue
});

export const AnalyticsDispatchContext = createContext<React.Dispatch<InitAction | PageLinkAction> | undefined>(undefined);

//Redux like logic
//reducer function thyat exists to update the State when update action is dispatched
//when multiple Actions are possible we will use a union to describe this action
const reducer = (state: AnalyticsContextState, action: InitAction | PageLinkAction) => {
	const {type} = action;

	if (type === INIT) {

		initializeAnalytics();
		ReactPixel.pageView(); // For tracking page view

		return { hasConsented: true }

	} else if (type === PAGE_LINK) {
		const {payload : { link }} = action

		state.hasConsented && pageLinkAnalytics(link);
	}

	return state;
}

//implementing custom hook to use whenever to access the setState function
export const useAnalyticsDispatch = () => {
	const dispatch = useContext(AnalyticsDispatchContext);

	//typeguard for invalid set state
	if (!dispatch) throw new Error("useDispatch was called outside of useAnalyticsDispatch");

	return dispatch;
}

export const useAnalyticsState = () => useContext(AnalyticsStateContext);

//This Context Provider Stands for GDPR Compliance
const AnalyticsContextProvider: React.FC = ({ children }) => {

	//These are Section related values
	const [state, dispatch] = useReducer(reducer, defaultStateValue);

	useEffect(() => {
		ReactPixel.init(FACEBOOK_PIXEL_ID, undefined, options);
		ReactPixel.revokeConsent();
	}, [])

	return (
		<AnalyticsStateContext.Provider value={state}>
			<AnalyticsDispatchContext.Provider value={dispatch}>
				{children}
			</AnalyticsDispatchContext.Provider>
		</AnalyticsStateContext.Provider>
	);

};

export default AnalyticsContextProvider;