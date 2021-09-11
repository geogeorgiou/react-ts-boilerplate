import merge from "deepmerge";
import { green, grey } from "@material-ui/core/colors";
import { THEMES } from "../constants";

const customBlue = {
	50: "#e9f0fb",
	100: "#c8daf4",
	200: "#a3c1ed",
	300: "#7ea8e5",
	400: "#6395e0",
	500: "#4782da",
	600: "#407ad6",
	700: "#022388",
	800: "#2f65cb",
	900: "#2052c2",
}

const defaultVariant = {
	name: THEMES.DEFAULT,
	palette: {
		type: "light",
		primary: {
			main: customBlue[700],
			contrastText: "#FFF"
		},
		secondary: {
			main: customBlue[500],
			contrastText: "#FFF"
		},
		background: {
			default: "#EEF2F9",
			paper: "#FFF",
			card: "#F9FAFD"
		}
	},
	footer: {
		color: grey[500],
		background: "#FFF"
	},
	sidebar: {
		color: grey[200],
		background: "#233044",
		header: {
			color: grey[200],
			background: "#233044",
			brand: {
				color: customBlue[500]
			}
		},
		footer: {
			color: grey[200],
			background: "#1E2A38",
			online: {
				background: green[500]
			}
		}
	},
	badge: {
		color: "#FFF",
		background: "#a80049",
		notificationTime: {
			color: "#c75e8b"
		}
	}

}

const darkVariant = merge(defaultVariant, {
	name: THEMES.DARK,
	palette: {
		primary: {
			main: customBlue[600],
			contrastText: "#FFF"
		},
		background: {
			default: "#1B2635",
			paper: "#233044",
			card: "#c2d2ec66"
		},
		text: {
			primary: "rgba(255, 255, 255, 0.95)",
			secondary: "rgba(255, 255, 255, 0.5)"
		}
	},
	footer: {
		color: grey[300],
		background: "#233044"
	}
})

const variants: Array<any> = [
	defaultVariant,
	darkVariant,
	// lightVariant
]

export type VariantType = {
	name: string;
	palette: {
		primary: MainContrastTextType,
		secondary: MainContrastTextType
	},
	footer: ColorBgType,
	sidebar: ColorBgType & {
		header: ColorBgType & {
			brand: {
				color: string
			}
		};
		footer: ColorBgType & {
			online: {
				background: string
			}
		},
		badge: ColorBgType
	}
}

type MainContrastTextType = {
	main: string;
	contrastText: string;
}

type ColorBgType = {
	color: string;
	background: string
}

export default variants;