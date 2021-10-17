import React, { useEffect, useState } from "react";
import { IconButton as MuiIconButton } from "@material-ui/core";
import {
	getLangFlagSvgAccessor,
	getLangOptionIndex,
	LangOption,
	LocalesNsOption,
	useLang
} from "../context/LangContextProvider";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const IconButton = styled(MuiIconButton)`
	svg {
		width: 22px;
		height: 22px;
	}
`;

const Flag = styled.img`
	border-radius: 50%;
	width: 22px;
	height: 22px;
`;

const FlagIcon = (props) => {


	const [flag, setFlag] = useState();

	useEffect(() => {
		const loadSvg = async () => {
			// const countryCode = currentLang; // "en-US" => "us"
			const countryCode = getLangFlagSvgAccessor(props.currentLang); //props.currentLang
			const { default: response } = await import(`svg-country-flags/svg/${countryCode}.svg`);
			setFlag(response);
		};
		loadSvg();
	}, [props.currentLang]);


	return (
		// <Flag src={process.env.PUBLIC_URL + `/static/img/flags/${currentLang}.png`} alt={`${currentLang}-logo`} />
		<Flag src={flag} alt={`${props.currentLang}-logo`} />
	);

	// return <img src={flag} width={40} height={20}/>;
};

type LangMenuOptionType = {
	// name: string,
	i18nOption: LangOption,
	menuIndex: number //possible redundant for 2 values
}

const langMenuOptions: LangMenuOptionType[] = [
	{ i18nOption: LangOption.Greek, menuIndex: 0 },
	{ i18nOption: LangOption.English, menuIndex: 1 }
];

// type ShowMenuItemType = {
// 	chosen?: boolean
// }


// const ShowMenuItem = styled(MenuItem)<ShowMenuItemType>`
// 	${props => props.chosen && css`
// 		display: none;
//   `};
// `

const LangMenu = styled(Menu)`
	margin-top: 2rem;
`;


const LanguagesDropdown = () => {

	const { currentLang, setCurrentLang } = useLang();
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [anchorMenu, setAnchorMenu] = useState<any>(null);

	const { t } = useTranslation(LocalesNsOption.Common);

	const toggleMenu = (event: React.SyntheticEvent) => {
		setAnchorMenu(event.currentTarget);
	};

	const closeMenu = () => {
		setAnchorMenu(null);
	};

	const onClickHandler = (activeIndex: number) => {

		//get naming convention for i18
		const newLang = langMenuOptions[activeIndex].i18nOption;

		setCurrentLang(newLang);

		//set curr dropdown value and close menu
		setSelectedIndex(activeIndex);
		// setFlagConfig({langIndex: activeIndex, flagAccessor: })
		setAnchorMenu(null);
	};

	useEffect(() => {

		//use a type safe method to get lang index
		setSelectedIndex(getLangOptionIndex(currentLang));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	return (
		<>
			{
				selectedIndex !== -1 && (
						<>
							<Tooltip title={t("common:lang.label") as string}>
								<IconButton
									aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
									// aria-haspup={"true"}
									onClick={toggleMenu}
									color={"inherit"}
								>
									{/*{getFlagIcon(currentLang)}*/}
									<FlagIcon currentLang={currentLang} />
								</IconButton>
							</Tooltip>
							<LangMenu
								id={"menu-appbar"}
								anchorEl={anchorMenu}
								open={Boolean(anchorMenu)}
								onClose={closeMenu}
								keepMounted
							>
								{
									langMenuOptions.map(({ i18nOption }, i) => (
										<MenuItem
											key={`lang-option-${i18nOption}`}
											onClick={() => onClickHandler(i)}
											selected={selectedIndex === i}
										>
											{t(`common:lang.${i18nOption}`)}
										</MenuItem>
									))
								}
							</LangMenu>
						</>
					)
			}
		</>
	);

};

export default LanguagesDropdown;