import React from "react";
import styled from "styled-components";
import { GlobalStyle, Root } from "./AuthLayout";
import { CssBaseline } from "@material-ui/core";

const Root1 = styled(Root)`
	min-height: 80%;
`;

const SignIn: React.FC = ({ children }) => {
	return (
		<Root1>
			<CssBaseline />
			<GlobalStyle />
			{children}
		</Root1>
	);
};

export default SignIn;