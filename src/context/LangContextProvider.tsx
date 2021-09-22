import React, { createContext, useContext, useState } from "react";

export enum LangOption {
	Greek = "el",
	English = "en"
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

export const useLang = () => useContext(LangContext);


const LangContextProvider: React.FC = ({ children }) => {

	// const { t, i18n } = useTranslation(["common", "translation"]);
	const [currentLang, setCurrentLang] = useState(LangOption.Greek);

	// useEffect(() => {
	// 	i18n.changeLanguage(currentLang);
	// }, [currentLang]);

	return (
		<LangContext.Provider value={{ currentLang, setCurrentLang }}>
			{children}
		</LangContext.Provider>
	);

};


export default LangContextProvider;