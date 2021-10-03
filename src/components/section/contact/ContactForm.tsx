import React, { useState } from "react";

import {
	useForm,
	FormProvider
} from "react-hook-form";
import { Card } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import TextFieldWrapper from "../../rhf/TextFieldWrapper";
import styled from "styled-components";

//plain description of RHF Form
const RHForm = (props) => <form {...props}>{props.children}</form>

const StyledCardContent = styled(CardContent)`
	padding: 3rem;
    width: 40rem;
`

const ContactForm = () => {

	const [formState, setFormState] = useState<any>({
		isLoading: true,
		isResetToggle: false,
		error: "",
		formData: { },
	});


	const methods = useForm({
		defaultValues: { ...formState }, //just get the values from state...
		mode: "onSubmit"
	});

	const onSubmit = () => {
		console.log("submitted!");
	}


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
									label={"contactForm.title"}
									name={"title"}
									rules={{required: true}}
								/>
							</Grid>
							<Grid item>
								<TextFieldWrapper
									label={"contactForm.request"}
									name={"request"}
									rules={{required: true}}
								/>
							</Grid>
						</Grid>

					</StyledCardContent>
					<CardActions>
						{/*<Button size="small">Share</Button>*/}
						{/*<Button size="small">Learn More</Button>*/}
						<Grid container justifyContent={"center"}>
							<Grid
								item
							>
								<Button
									type="submit"
									variant={"outlined"}
									// color="primary"
									// variant={btnItem.isChecked ? "contained" : "outlined"}
								>
									Submit
								</Button>
							</Grid>
						</Grid>
					</CardActions>

				</Card>
			</RHForm>
		</FormProvider>
	)

}

export default ContactForm;
