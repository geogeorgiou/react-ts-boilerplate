import React from "react";

import styled, { createGlobalStyle } from "styled-components";
import { GlobalStyleProps } from "../types/styles";
import { Box, CssBaseline } from "@material-ui/core";

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
	html,
	body,
	#root {
		height: 100%
	}
	
`;

export const Root = styled.div`
	max-width: 520px;
	min-width: 100%;
	margin: 0 auto;
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;	
`;

const AuthLayout: React.FC = ({ children }) => {
	return (
		<Root>
			<CssBaseline />
			<GlobalStyle />
			<Box id="authLayoutContent">{children}</Box>
		</Root>
	);
};

export default AuthLayout;