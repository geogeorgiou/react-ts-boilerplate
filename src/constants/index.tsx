//Theme
export const THEME_SET = "THEME_SET";

export enum THEME {
	DEFAULT = "DEFAULT",
	DARK = "DARK",
	LIGHT = "LIGHT"
}

/**
 * Helper function to determine NODE_ENV MODE
 */
export function isProductionMode() {
	return process.env.NODE_ENV === "production";
}