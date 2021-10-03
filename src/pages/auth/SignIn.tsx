import React from "react";
import { Grid } from "@material-ui/core";
import { Helmet } from "react-helmet";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components/macro";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import * as Yup from "yup";
import i18n from "../../i18n";
import { Formik, FormikConfig } from "formik";
import { useTranslation } from "react-i18next";
import { LocalesNsOption } from "../../context/LangContextProvider";

const Wrapper = styled(Paper)`
	padding: ${props => props.theme.spacing(6)}px;
	min-width: 600px;
	${props => props.theme.breakpoints.up("md")} {
		padding: ${props => props.theme.spacing(6)}px;
	}
`

const defaultValues = {
	username: "",
	password: ""
}

const validationSchema = Yup.object().shape({
	username: Yup.string().max(25).required(i18n.t("description.part1")),
	password: Yup.string().max(25).required(i18n.t("description.part1"))
})

const FormikForm:React.FC<FormikConfig<any>> = ({children, ...rest}) => {
	return (
		<Formik
			// initialValues={{...defaultValues}}
			// validationSchema={{ ...validationSchema }}
			// onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {
			// 	console.log(values);
			// }}
			{...rest}
		>
			{children}
		</Formik>
	)
}

function SignIn() {

	const { t } = useTranslation([LocalesNsOption.Common, LocalesNsOption.Translation]);


	return (
		<Wrapper>
			<Helmet title={t("general.appTitle")}/>

			<Typography variant="h2" align="center" gutterBottom>
				<Box ml={1}>
					{t("common:signIn.title")}
				</Box>
			</Typography>

			{/*<Typography variant="h4" align="center" gutterBottom>*/}
			{/*	<Box ml={1}>*/}
			{/*		{t("common:signIn.title")}*/}
			{/*	</Box>*/}
			{/*</Typography>*/}

			<FormikForm
				initialValues={{...defaultValues}}
				validationSchema={{ ...validationSchema }}
				onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {
					console.log(values);
				}}
			>
				<Grid container direction="column">
					<Grid item>
						{t("common:general.username")}
					</Grid>
					<Grid item>
						{t("common:general.password")}
					</Grid>
				</Grid>
			</FormikForm>

		</Wrapper>


	)

}

export default SignIn;