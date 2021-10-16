import React, { FC, useState } from "react";

import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Card } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import TextFieldWrapper from "../../rhf/TextFieldWrapper";
import styled from "styled-components";
import { useCustomTranslation } from "../../../context/LangContextProvider";

import ResetIcon from "@material-ui/icons/DeleteForever";
import * as contactFormService from "../../../service/contactFormService";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSnackbarCreator } from "../../SnackbarCreator";
import { Alert } from "@material-ui/lab";
import Collapse from "@material-ui/core/Collapse";

//plain description of RHF Form
const RHForm = (props) => <form {...props} noValidate>{props.children}</form>;

const StyledCardContent = styled(CardContent)`
	padding: 3rem;
    width: 40rem;
    
    // ${props => props.theme.breakpoints.down("md")} {
	// 	width: 20rem;
	// }
	
	${props => props.theme.breakpoints.down("sm")} {
		width: 15rem;
	}
    
}
`;

const StyledCardAction = styled(CardActions)`
    padding-bottom: 30px;
`

export type AnyProps = {
	[key: string]: any
}

//form initial values
const initialValues = {
	title: "",
	email: "",
	request: ""
};

type UserNotificationAlertProps = {
	control: any;
}

//alert to notify user about stuff
const UserNotificationAlert:FC<UserNotificationAlertProps> = ({ control }) => {

	const { t } = useCustomTranslation();
	const emailVal = useWatch({
		control,
		name: "email" // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
	});
	const [isAlertOpen, setIsAlertOpen] = useState(true); //initialize as shown

	const hasUserTyped = emailVal.length > 0;

	return (
		<Grid item>
			{
				hasUserTyped && (
					<Collapse in={isAlertOpen}>
						<Alert severity="info" onClose={() => setIsAlertOpen(false)}>
							{t("translation:contactForm.alertInfo")}
						</Alert>
					</Collapse>
				)
			}
		</Grid>
	);

}

const CircularProgressSubmitIcon = () => <CircularProgress style={{width: "0.8rem", height: "0.8rem", color: "#BDC1C7" }}/>;

const CommonButton = styled(Button)`
	font-weight: bolder;
`

export const SubmitButton = styled(CommonButton)<AnyProps>`

	color: ${props => props.btnColor || props.theme.palette.primary.main};
	border-color: ${props => props.btnColor || props.theme.palette.primary.main};
	
	&:hover {
		color: #FFFFFF;
    	background: ${props => props.btnColor || props.theme.palette.primary.main};
	}

`

const SubmitButton2 = styled(SubmitButton)`
	color: ${props => props.theme.section.contact.submitButton};
`

const ResetButton = styled(CommonButton)`
	
	color: #FFFFFF;
	background-color: ${props => props.theme.palette.secondary.main};
	
	&:hover {
		//color: rgb(221,63,49);
    	//border-color: rgb(221,63,49);
    	//background-color: inherit; //resets mui fuckin theme
		background-color: ${props => props.theme.palette.secondary.main};
	}
`

const ContactForm = () => {

	const { t } = useCustomTranslation();

	const { enqueueCustomSnackbar } = useSnackbarCreator();

	const [loading, setIsLoading] = useState(false);


	function toggleLoading() {
		setIsLoading(prevState => !prevState);
	}

	const methods = useForm({
		defaultValues: { ...initialValues }, //just get the values from state...
		mode: "onBlur"
	});

	const onSubmit = (data: any) => {
		const { title, request, email } = data;

		toggleLoading();

		//execute form submission here
		contactFormService.submitFormRequest(`${title} - [${email}]`, request)
			.then(_ => enqueueCustomSnackbar("common:form.successSubmit", { variant: "success" }))
			.catch(_ => enqueueCustomSnackbar("common:form.errorSubmit", { variant: "error" }))
			.finally(toggleLoading);
	};

	const { handleSubmit, control, reset } = methods;


	return (
		<FormProvider {...methods}>
			<RHForm onSubmit={handleSubmit(onSubmit)}>
				<Card>
					<StyledCardContent>
						<Grid
							container
							spacing={6}
							direction={"column"}
						>

							<UserNotificationAlert control={control}/>

							<Grid item>
								<TextFieldWrapper
									control={control}
									label={"translation:contactForm.title.label"}
									placeholder={"translation:contactForm.title.placeholder"}
									name={"title"}
									rules={{
										required: "common:validation.required",
										minLength: {
											value: 2,
											message: t("common:validation.minChar", { minCharNum: 2 })
										},
										maxLength: {
											value: 100,
											message: t("common:validation.maxChar", { maxCharNum: 8 })
										}
									}}
								/>
							</Grid>
							<Grid item>
								<TextFieldWrapper
									control={control}
									label={"translation:contactForm.email.label"}
									placeholder={"translation:contactForm.email.placeholder"}
									name={"email"}
									rules={{
										required: "common:validation.required",
										pattern: {
											value: /^([a-zA-Z0-9_\-\.]+)@(([a-zA-Z0-9_\-\.]+))\.([a-zA-Z]{2,5})$/,
											message: "common:validation.email"
										}
									}}
								/>
							</Grid>
							<Grid item>
								<TextFieldWrapper
									control={control}
									label={"translation:contactForm.request.label"}
									placeholder={"translation:contactForm.request.placeholder"}
									name={"request"}
									rules={{
										required: "common:validation.required",
										minLength: {
											value: 50,
											message: t("common:validation.minChar", { minCharNum: 100 })
										},
										maxLength: {
											value: 800,
											message: t("common:validation.maxChar", { maxCharNum: 800 })
										}
									}}
									multiline
									minRows={10}
									maxRows={Infinity}
								/>
							</Grid>
						</Grid>

					</StyledCardContent>
					<StyledCardAction>
						<Grid
							container
							spacing={4}
							justifyContent={"center"}
						>
							<Grid
								item
							>
								<SubmitButton2
									type="submit"
									// variant="contained"
									variant={"outlined"}
									// color="primary"
									disabled={loading}
									endIcon={loading && <CircularProgressSubmitIcon/>}
								>
									{t("common:form.submit")}
								</SubmitButton2>
							</Grid>
							<Grid
								item
							>
								<ResetButton
									variant={"outlined"}
									color="secondary"
									endIcon={<ResetIcon />}
									onClick={() => reset({ ...initialValues })}
									disabled={loading}
								>
									{t("common:form.reset")}
								</ResetButton>
							</Grid>
						</Grid>
					</StyledCardAction>

				</Card>
			</RHForm>
		</FormProvider>
	);

};

export default ContactForm;
