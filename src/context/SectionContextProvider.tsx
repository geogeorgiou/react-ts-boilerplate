import React, { createContext, useContext, useEffect, useState } from "react";
import { scroller } from "react-scroll";
import { PAGE_LINK, useAnalyticsDispatch } from "./AnalyticsContextProvider";

export enum SectionIndexEnum {
	HOME = "home",
	GOALS = "goals",
	SERVICES = "services",
	CONTACT = "contact"
}

export const sectionIndexToEnumMap = (index: number) => ({
	0: [SectionIndexEnum.HOME],
	1: [SectionIndexEnum.GOALS],
	2: [SectionIndexEnum.SERVICES],
	3: [SectionIndexEnum.CONTACT]
})[index];

export const routes = [
	{
		link: "/",
		name: "header.homepage",
		section: SectionIndexEnum.HOME,
		activeIndex: 0
	},
	{
		link: "/goals",
		name: "header.goals",
		section: SectionIndexEnum.GOALS,
		activeIndex: 1
	},
	{
		link: "/services",
		name: "header.services",
		section: SectionIndexEnum.SERVICES,
		activeIndex: 2
	},
	{
		link: "/contact",
		name: "header.contact-us",
		section: SectionIndexEnum.CONTACT,
		activeIndex: 3
	}
];


type SectionContextState = {
	sectionValue: number,
	setSectionValue: (index: number) => void
	setSectionBySectionId: (sectionId: SectionIndexEnum) => void
}

const defaultStateValue: SectionContextState = {
	sectionValue: 0,
	setSectionValue: (index: number) => {
	},
	setSectionBySectionId: (sectionId: SectionIndexEnum) => {
	}
};

//Lang context export no need to use this atomically
export const SectionContext = createContext({
	...defaultStateValue
});

/**
 * scrolling function
 * @param id - input id to navigate to
 */
function scrollToSection(id: string) {
	scroller.scrollTo(id, {
		duration: 500,
		offset: -20,
		delay: 0,
		smooth: true
	});
};

export const useSectionContext = () => useContext(SectionContext);

const SectionContextProvider: React.FC = ({ children }) => {

	//These are Section related values
	const [value, setValue] = useState(0);
	const analyticsDispatch = useAnalyticsDispatch();

	useEffect(() => {

		let sectionFound = routes.find(i => i.activeIndex === value);
		if (sectionFound) {
			scrollToSection(sectionFound.section);

			//whenever section changes trigger analytics
			analyticsDispatch({
				type: PAGE_LINK,
				payload: {
					link: sectionFound.link
				}
			});
		}


		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	return (
		<SectionContext.Provider value={{
			sectionValue: value,
			setSectionValue: (index: number) => setValue(index),
			setSectionBySectionId: (sectionId: SectionIndexEnum) => {

				let sectionFound = routes.find(i => i.section === sectionId);
				sectionFound && setValue(sectionFound.activeIndex);

			}
		}}>
			{children}
		</SectionContext.Provider>
	);

};


export default SectionContextProvider;