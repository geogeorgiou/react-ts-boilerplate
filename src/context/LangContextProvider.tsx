import React, { createContext, useContext, useEffect, useState } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "../i18n";

/**
 * the options for language in enum form
 */
export enum LangOption {
	Greek = "el",
	English = "en"
}

/**
 * easy enum locales enum
 */
export enum LocalesNsOption {
	Common= "common",
	Translation= "translation"
}

// /**
//  * map function to use with i18n translation hook to retrieve all namespaces
//  */
// export function getAllLocalesNs(): LocalesNsOption[] {
//
// 	return [
// 		LocalesNsOption.Common,
// 		LocalesNsOption.Translation
// 	];
//
// }


/**
 * Map function that returns svg accessor related to langOption
 * @param langOption
 */
export const getLangFlagSvgAccessor = (langOption: LangOption) => ({
	[LangOption.Greek]: "gr",
	[LangOption.English]: "gb"
})[langOption]

/**
 * returns langIndex
 *
 * @param langOption - currentLang option
 */
export function getLangOptionIndex(langOption: LangOption): number {

	let langIndex; //greek

	switch (langOption) {
		case LangOption.English:
			langIndex = 1;
			break;
		default:
			langIndex = 0;
	}

	return langIndex;

}

type LangContextState = {
	currentLang: LangOption,
	setCurrentLang: (currentLang: LangOption) => void
}

const defaultStateValue: LangContextState = {
	currentLang: LangOption.Greek,
	setCurrentLang: currentLang => console.warn("no LangContextProvider")
};

//Lang context export no need to use this atomically
export const LangContext = createContext({
	...defaultStateValue
});

/**
 * Custom hook that returns updated useTranslation namespace
 * @param nsOptionArr - if none defined returned all namespaces otherwise what you have set
 */
export const useCustomTranslation = (nsOptionArr ?: LocalesNsOption[]) => {

	const { t } = useTranslation(nsOptionArr && [LocalesNsOption.Common, LocalesNsOption.Translation] )

	return { t }
}


export const useLang = () => useContext(LangContext);

//basically an App Wrapper for localisation exposed from this file
export const EnhancedI18Provider: React.FC = ({ children }) => {

	return (
		<I18nextProvider i18n={i18n}>
			<LangContextProvider>
				{children}
			</LangContextProvider>
		</I18nextProvider>
	)

};

const LangContextProvider: React.FC = ({ children }) => {

	const { i18n } = useTranslation();
	const [currentLang, setCurrentLang] = useState(i18n.language as LangOption || LangOption.Greek);

	useEffect(() => {
		i18n.changeLanguage(currentLang);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentLang]);

	return (
		<I18nextProvider i18n={i18n}>
			<LangContext.Provider value={{ currentLang, setCurrentLang }}>
				{children}
			</LangContext.Provider>
		</I18nextProvider>
	)

};


export default LangContextProvider;