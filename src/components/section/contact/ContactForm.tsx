import React from "react";

import { FormProvider, useForm } from "react-hook-form";
import { Card } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import TextFieldWrapper from "../../rhf/TextFieldWrapper";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { LocalesNsOption } from "../../../context/LangContextProvider";

import ResetIcon from "@material-ui/icons/DeleteForever";
import * as contactFormService from "../../../service/contactFormService";

//plain description of RHF Form
const RHForm = (props) => <form {...props}>{props.children}</form>;

const StyledCardContent = styled(CardContent)`
	padding: 3rem;
    width: 40rem;
`;

//form initial values
const initialValues = {
	title: "",
	request: ""
};

const ContactForm = () => {

	const { t } = useTranslation([LocalesNsOption.Common]);


	// const [formState, setFormState] = useState<any>({
	// 	isLoading: true,
	// 	isResetToggle: false,
	// 	error: "",
	// 	formData: {
	// 		title: "",
	// 		request: ""
	// 	},
	// });


	const methods = useForm({
		defaultValues: { ...initialValues }, //just get the values from state...
		mode: "onSubmit"
	});

	const onSubmit = (data: any) => {
		const { title, request } = data;

		//execute form submission here
		contactFormService.submitFormRequest(title, request);
	};


	return (
		<FormProvider {...methods}>
			<RHForm onSubmit={methods.handleSubmit(onSubmit)}>
				<Card>
					<StyledCardContent>
						<Grid
							container
							spacing={6}
							direction={"column"}
						>
							<Grid item>
								<TextFieldWrapper
									control={methods.control}
									label={"translation:contactForm.title"}
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
									control={methods.control}
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
					<CardActions>
						<Grid
							container
							spacing={4}
							justifyContent={"center"}
						>
							<Grid
								item
							>
								<Button
									type="submit"
									variant={"outlined"}
									// color="primary"
									// variant={btnItem.isChecked ? "contained" : "outlined"}
								>
									{t("common:form.submit")}
								</Button>
							</Grid>
							<Grid
								item
							>
								<Button
									variant={"outlined"}
									color="secondary"
									endIcon={<ResetIcon />}
									onClick={() => methods.reset({ ...initialValues })}
								>
									{t("common:form.reset")}
								</Button>
							</Grid>
						</Grid>
					</CardActions>

				</Card>
			</RHForm>
		</FormProvider>
	);

};

export default ContactForm;
