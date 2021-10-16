import merge from "deepmerge";
import { green, grey } from "@material-ui/core/colors";
import { THEME } from "../constants";

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
	900: "#2052c2"
};


const palette = {
	primary: {
		light: "#3868fc",
		dark: "#022388"
	},
	secondary: {
		light: "#E0E0E0",
		dark: "#bbb"
	},
	regularCommon: {
		white: {
			light: "#FFFFFF",
			dark: "#FFFFFF"
		}
	}
	// section: {
	// 	goal: {
	// 		light: "#FFFFFF",
	// 		dark: "#F2F2F2"
	// 	}
	// }


}

const defaultVariant = {
	name: THEME.DEFAULT,
	palette: {
		type: "light",
		primary: {
			// main: customBlue[700],
			main: palette.primary.light,
			contrastText: "#FFF"
		},
		secondary: {
			main: palette.secondary.light,
			contrastText: "#FFF"
		},
		background: {
			default: "#EEF2F9",
			paper: "#FFF",
			card: "#F9FAFD"
		},
		regularCommon: {
			blue: "#3c31dd",
			red: "#dd3f31",
			pink: "#ff0066",
			dark: "#0f0f10",
			white: palette.regularCommon.white.light
		}
	},
	header: {
		color: grey[500],
		background: "#FFF",
		search: {
			color: grey[800]
		},
		indicator: {
			background: customBlue[600]
		},
		filterCategory: {
			background: "#022388"
		}
	},
	typography: {
		fontFamily: `"Prompt", sans-serif`,
		h2: {
			fontSize: "1.5rem",
		}
	},
	section: {
		goal: {
			main: "#FFF"
		},
		contact: {
			submitButton: palette.primary.light
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
		},
		badge: {
			color: "#FFF",
			background: "#a80049",
			notificationTime: {
				color: "#c75e8b"
			}
		}
	},


};

const darkVariant = merge(defaultVariant, {
	name: THEME.DARK,
	palette: {
		type: "dark",
		primary: {
			main: palette.primary.dark
		},
		secondary: {
			main: palette.secondary.dark
		},
		background: {
			default: "#1B2635",
			paper: "#233044",
			card: "#c2d2ec66"
		},
		regularCommon: {
			white: palette.regularCommon.white.dark
		}
		// text: {
		// 	primary: "rgba(255, 255, 255, 0.95)",
		// 	secondary: "rgba(255, 255, 255, 0.5)"
		// }
	},
	section: {
		contact: {
			submitButton: "#FFF"
		}
	},
	// footer: {
	// 	color: grey[300],
	// 	background: "#233044"
	// }
});

const variants: Array<VariantType> = [
	defaultVariant,
	darkVariant
	// lightVariant
];

export type VariantType = {
	name: string;
	palette: {
		primary: MainContrastTextType,
		secondary: MainContrastTextType,
		regularCommon: {
			blue: string,
			red: string,
			pink: string,
			dark: string
		}
	},
	header: {
		color: string,
		background: string,
		search: {
			color: string
		},
		indicator: {
			background: string
		},
		filterCategory: {
			background: string
		}
	},
	section: {
		goal: {
			main: string
		},
		contact: {
			submitButton: string
		}
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