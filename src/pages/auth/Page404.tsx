import React from "react";
import { Button as MuiButton, Typography } from "@material-ui/core";
import styled from "styled-components/macro";
import { MuiButtonSpacingType } from "../../types/styles";
import { Helmet } from "react-helmet";
import { spacing } from "@material-ui/system";
import { Link } from "react-router-dom";


const Button = styled(MuiButton)<MuiButtonSpacingType>(spacing);

const Wrapper = styled.div`
	padding: ${(props) => props.theme.spacing.unit};
	text-align: center;
	background: transparent;
	
	${props => props.theme.breakpoints.up("md")} {
		padding: ${props => props.theme.spacing.unit};
	}
`

function Page404() {

	return (
		<Wrapper>
			<Helmet title="404 Error"/>
			<Typography variant="h1" align="center" gutterBottom>
				404
			</Typography>
			<Typography variant="h5" align="center" gutterBottom>
				Page not Found.
			</Typography>
			<Typography variant="h2" align="center" gutterBottom>
				The page you are looking for might have been removed.
			</Typography>

			<Button
				component={Link}
				to={"/"}
				variant={"contained"}
				color={"secondary"}
				mt={2}
			>
				Return to website
			</Button>
		</Wrapper>
	)

}

export default Page404;