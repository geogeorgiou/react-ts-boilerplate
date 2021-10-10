import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "../../context/ThemeContextProvider";
import { Button, SwipeableDrawer, Tab, Tabs, useMediaQuery, useTheme as useThemeObject } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import ControlledSwitch from "../../components/ControlledSwitch";
import { THEME } from "../../constants";
import { useTranslation } from "react-i18next";
import LanguagesDropdown from "../../components/LanguagesDropdown";
import styled from "styled-components/macro";

import LightModeIcon from "@material-ui/icons/Brightness7";
import DarkModeIcon from "@material-ui/icons/Brightness3";
import Box from "@material-ui/core/Box";
import { LocalesNsOption } from "../../context/LangContextProvider";
import { scroller } from "react-scroll";



function ElevationScroll(props) {
	const { children } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0
	});
}

//solves the toolbar overflowing over text issue
const useStyles = makeStyles(theme => ({

	toolbarMargin: {
		...theme.mixins.toolbar,
		// marginBottom: "3em",
		// [theme.breakpoints.down("md")]: {
		// 	marginBottom: "2em"
		// },
		// [theme.breakpoints.down("xs")]: {
		// 	marginBottom: "1.25em"
		// }
	},

	logo: {
		height: "8em",
		[theme.breakpoints.down("md")]: {
			height: "7em"
		},
		[theme.breakpoints.down("xs")]: {
			height: "5.5em"
		}
	},

	logoContainer: {
		padding: 0,
		"&:hover": {
			"backgroundColor": "transparent"
		}
	},

	tabContainer: {
		marginLeft: "auto"
	},

	//abstracting logic of tab into the theme!
	//fast re-usability expose feature!!!
	tab: {
		// ...theme.typography.tab,
		minWidth: "8rem",
		marginLeft: "25px"
	},

	button: {
		// ...theme.typography.estimate,
		borderRadius: "50px",
		marginLeft: "50px",
		marginRight: "25px",
		height: "45px",
		"&:hover": {
			backgroundColor: theme.palette.secondary.light
		}
	},

	menu: {
		// backgroundColor: theme.palette.common.blue,
		color: "white",
		borderRadius: 0
	},

	menuItem: {
		// ...theme.typography.tab,
		opacity: 0.7,
		"&:hover": {
			opacity: 1
		}
	},

	drawerIconContainer: {
		marginLeft: "auto",
		"&:hover": {
			backgroundColor: "transparent"
		}
	},

	drawerIcon: {
		width: "50px",
		height: "50px"
	},

	drawer: {
		// backgroundColor: theme.palette.common.blue
	},

	drawerItem: {
		// ...theme.typography.tab,
		color: "white",
		opacity: 0.7
	},

	drawerItemSelected: {
		"& .MuiListItemText-root": {
			opacity: 1
		}
	},

	drawerItemEstimate: {
		// backgroundColor: theme.palette.common.orange
	},

	// appBar: {
	// 	zIndex: theme.zIndex.modal + 1
	// }

}));

// type HeaderMenuOptionType = {
// 	name: string,
// 	link: string,
// 	activeIndex: number,
// 	selectedIndex: number
// }

const TabContainer = styled(Tabs)`
	margin-right: 1rem;
	//margin-top: 0.6rem;
`

enum HeaderIndexEnum {
	INDEX_0,
	INDEX_1,
	INDEX_2,
	INDEX_3,
	INDEX_4
}

const ThemeSwitch = () => {

	const { t } = useTranslation(LocalesNsOption.Common);

	const { currentTheme, setCurrentTheme } = useTheme();

	//label is inverse of what u think
	const label = currentTheme === THEME.DEFAULT ? t("theme.dark") : t("theme.default");

	return (
		<ControlledSwitch
			// label={t(`theme.${currentTheme.toLowerCase()}`)}
			labelConfig={{checked: LightModeIcon, unchecked: DarkModeIcon}}
			label={label}
			labelPlacement={"end"}
			isChecked={currentTheme === THEME.DEFAULT}
			handleChange={() => setCurrentTheme(currentTheme === THEME.DEFAULT ? THEME.DARK : THEME.DEFAULT)}
		/>
	)

}


const routes = [
	{
		link: "/",
		name: "header.homepage",
		section: "home",
		activeIndex: HeaderIndexEnum.INDEX_0
	},
	{
		link: "/goals",
		name: "header.goals",
		section: "goals",
		activeIndex: HeaderIndexEnum.INDEX_1
	},
	{
		link: "/services",
		name: "header.services",
		section: "services",
		activeIndex: HeaderIndexEnum.INDEX_2,
	},
	{
		link: "/contact",
		name: "header.contact-us",
		section: "contact",
		activeIndex: HeaderIndexEnum.INDEX_3
	}
];

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

export default function Header(props: any) {

	const theme = useThemeObject();
	const classes = useStyles();
	const { t } = useTranslation(LocalesNsOption.Common);

	//selects anything that's medium and below
	const matches = useMediaQuery(theme.breakpoints.down("md"));
	// const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);


	const [openDrawer, setOpenDrawer] = useState(false);


	const handleChange = (e, value) => {
		props.setValue(value);
	};

	//basically check when user refreshes the page set the correct active tab
	//if not set it via custom way
	// useEffect(() => {
	//
	// 	[...routes].forEach(route => {
	//
	// 		console.log(window.location.pathname);
	//
	// 		switch (window.location.pathname) {
	// 			case `${route.link}`:
	// 				if (props.selectedIndex !== route.activeIndex) {
	//
	// 					// props.setValue(route.activeIndex);
	//
	// 					// if (!route?.selectedIndex)
	// 					// 	return;
	// 					//
	// 					// props.setValue(route.activeIndex);
	// 					//
	// 					// //check if selectedIndex is defined before comparing with selectedIndex
	// 					if (route.activeIndex && route.activeIndex !== props.selectedIndex) {
	// 						props.setSelectedIndex(route.activeIndex);
	// 					}
	// 				}
	// 				break;
	// 			// case "/estimate":
	// 			// 	props.setValue(5);
	// 			// 	break;
	// 			default:
	// 				break;
	// 		}
	// 	});
	//
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// // }, [props.value, props.selectedIndex, routes, props]);
	// }, [props.value, props.selectedIndex]);

	useEffect(() => {

		let sectionFound = routes.find(i => i.activeIndex === props.value)
		sectionFound && scrollToSection(sectionFound.section);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.value])

	const drawer = (
		<>
			<SwipeableDrawer
				// disableBackdropTransition={!iOS}
				// disableDiscovery={iOS}
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
				onOpen={() => setOpenDrawer(true)}
				classes={{ paper: classes.drawer }}
			>
				<div className={classes.toolbarMargin} />
				<List disablePadding>

					{
						routes.map((tab, i) => {
							return (
								<ListItem
									divider
									button
									key={`drawer_item_${tab.name}`}
									component={Link}
									to={tab.link}
									onClick={() => {
										setOpenDrawer(false);
										props.setValue(i);
									}}
									classes={{ selected: classes.drawerItemSelected }}
									selected={props.value === i}
								>
									<ListItemText
										disableTypography
										className={classes.drawerItem}
									>
										{tab.name}
									</ListItemText>
								</ListItem>
							);
						})
					}

					<LanguagesDropdown/>

				</List>
			</SwipeableDrawer>
			<IconButton
				className={classes.drawerIconContainer}
				onClick={() => setOpenDrawer(!openDrawer)}
				disableRipple
			>
				<MenuIcon className={classes.drawerIcon} />
			</IconButton>
		</>
	);

	const tabs = (
		<>
			<TabContainer
				value={props.value}
				className={classes.tabContainer}
				onChange={handleChange}
				// indicatorColor="primary"
				// indicatorColor={{backgroundColor: '#e77600'}}
				// TabIndicatorProps={{style: {background:'#e77600'}}}
			>
				{
					routes.map((route, index) => {

						const routeIdx = `route-${index}`;

						return (
							<Tab
								key={`${routeIdx}-tab`}
								className={classes.tab}
								component={Link}
								// to={route.link}
								to={route.section}
								// indicatorColor="primary"
								// indicatorColor={{backgroundColor: '#e77600'}}
								// TabIndicatorProps={{style: {background:'#021C6D'}}}
								// value={route.activeIndex}
								label={t(route.name)}
							/>
						);
					})
				}

				{/*<Tab*/}
				{/*	key={`lang_tab`}*/}
				{/*	className={classes.tab}*/}
				{/*	component={LanguagesDropdown}*/}
				{/*	// to={route.link}*/}
				{/*	// label={t(route.name)}*/}
				{/*/>*/}

			</TabContainer>

			<Box mr={6}>
				<LanguagesDropdown/>
			</Box>

			<ThemeSwitch/>

		</>
	);

	return (
		<>
			<ElevationScroll {...props}>
				<AppBar position="fixed" >
					<Toolbar disableGutters={true}>

						<Button
							component={Link}
							to={"/"}
							className={classes.logoContainer}
							onClick={() => props.setValue(0)}
							disableRipple
						>
							{/*<img*/}
							{/*	src={logo}*/}
							{/*	alt="company logo"*/}
							{/*	className={classes.logo}*/}
							{/*/>*/}
							<SettingsEthernetIcon />
						</Button>

						{matches ? drawer : tabs}

					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</>
	);
}