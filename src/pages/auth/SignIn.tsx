import React from "react";
import { Grid } from "@material-ui/core";


function SignIn() {

	return (
		<Grid container direction="column">
			<Grid item>
				Username
			</Grid>
			<Grid item>
				Password
			</Grid>
		</Grid>
	)

}

export default SignIn;