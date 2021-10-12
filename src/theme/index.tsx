import { createTheme as muiThemeGenerator, Theme } from "@material-ui/core/styles";
import breakpoints from "./breakpoints";
import overrides from "./overrides";
import props from "./props";
import typography from "./typography";
import shadows from "./shadows";
import variants from "./variants";

const createTheme = (name: string): Theme => {

	let themeConfig = variants.find((variant) => variant.name === name);

	if (!themeConfig) {
		console.warn(new Error(`The theme ${name} is not valid!`));
		themeConfig = variants[0];
	}

	return muiThemeGenerator({
			spacing: 4,
			breakpoints: breakpoints,
			overrides: overrides,
			props: props,
			typography: typography,
			shadows: shadows,
			palette: themeConfig.palette
		},
		{
			name: themeConfig.name,
			header: themeConfig.header,
			footer: themeConfig.footer,
			sidebar: themeConfig.sidebar,
			section: themeConfig.section
		}
	);

	// return createTheme({
	// 		spacing: 4,
	// 		breakpoints: breakpoints,
	// 		overrides: overrides,
	// 		props: props,
	// 		typography: typography,
	// 		shadows: shadows,
	// 		palette: themeConfig.palette
	// 	},
	// 	{
	// 		name: themeConfig.name,
	// 		header: themeConfig.header,
	// 		footer: themeConfig.footer,
	// 		sidebar: themeConfig.sidebar
	// 	}
	// );

};

export default createTheme;