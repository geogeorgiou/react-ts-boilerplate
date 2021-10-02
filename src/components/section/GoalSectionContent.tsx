import React from "react";
import { CardComponent, CardComponentType } from "../CardComponent";
import { Grid } from "@material-ui/core";

import QualityIcon from '@material-ui/icons/Devices';
import TimeIcon from '@material-ui/icons/Timelapse';
import MaintenanceIcon from '@material-ui/icons/NewReleases';
import { useTranslation } from "react-i18next";

const cardContentArr = [
	{
		// title: "Ποιότητα",
		// textContent: "Μας ενδιαφέρει να παραδωθεί κάτι χρήσιμο και ποιοτικό που να έχει αντίκτυπο στην επιχείρησή του",
		icon: QualityIcon
	},
	{
		// title: "Χρόνος",
		// textContent: "Το κάθε προτζεκτ υπολογίζεται στο χρόνο που πρέπει για να ικανοποιηθεί ο πελάτης",
		icon: TimeIcon
	},
	{
		// title: "Συντήρηση",
		// textContent: "Ακόμα και μετά το πέρας της ολοκλήρωσης ενός site είμαστε κοντά σας σε ότι χρειαστεί για βελτιώσεις / διορθώσεις",
		icon: MaintenanceIcon
	}
]


export function GoalSectionContent() {

	const { t } = useTranslation("translation");

	return (
		<Grid container direction={"row"} justifyContent={"center"} spacing={6} style={{ flexWrap: "nowrap" }}>
			{
				cardContentArr.map(({icon}, index) => {

					const i18Accessor = `goalSection.${index}`;
					const title = t(`${i18Accessor}.title`);
					const text = t(`${i18Accessor}.text`);

					return (
						<Grid
							item
							key={`knowledge-section-${title}`}>
							<CardComponent
								icon={icon}
								title={title}
								textContent={text}
							/>
						</Grid>
					)

				})
			}
		</Grid>
	);

}
