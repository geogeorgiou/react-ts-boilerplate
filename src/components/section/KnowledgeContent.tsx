import React from "react";
import { CardComponent, CardComponentType } from "../CardComponent";
import { Grid } from "@material-ui/core";



const cardContentArr: CardComponentType[] = [
	{
		title: "Ποιότητα",
		content: "Μας ενδιαφέρει να παραδωθεί κάτι χρήσιμο και ποιοτικό που να έχει αντίκτυπο στην επιχείρησή του"
	},
	{
		title: "Χρόνος",
		content: "Το κάθε προτζεκτ υπολογίζεται στο χρόνο που πρέπει για να ικανοποιηθεί ο πελάτης"
	},
	{
		title: "Συντήρηση",
		content: "Ακόμα και μετά το πέρας της ολοκλήρωσης ενός site είμαστε κοντά σας σε ότι χρειαστεί για βελτιώσεις / διορθώσεις"
	}
]


export function KnowledgeSection() {

	return (
		<Grid container direction={"row"} justify={"center"} spacing={6} style={{ flexWrap: "nowrap" }}>
			{
				cardContentArr.map(({title, content}) => (
					<Grid item>
						<CardComponent
							key={title}
							title={title}
							content={content}
						/>
					</Grid>
				))
			}
		</Grid>
	);

}
