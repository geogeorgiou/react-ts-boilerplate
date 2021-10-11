import React from "react";
import { CardComponent } from "../../CardComponent";
import { Grid } from "@material-ui/core";

import QualityIcon from "@material-ui/icons/Devices";
import TimeIcon from "@material-ui/icons/Timelapse";
import MaintenanceIcon from "@material-ui/icons/NewReleases";
import { useTranslation } from "react-i18next";
import { LocalesNsOption } from "../../../context/LangContextProvider";

// const BigQualityIcon = styled(QualityIcon)`
// font-size: 5rem`
// const BigTimeIcon = styled(QualityIcon)` font-size: 5rem`
// const BigMaintenanceIcon = styled(QualityIcon)` font-size: 5rem`

const cardContentArr = [
	{
		icon: QualityIcon
	},
	{
		icon: TimeIcon
	},
	{
		icon: MaintenanceIcon
	}
]


export function GoalSectionContent() {

	const { t } = useTranslation(LocalesNsOption.Translation);

	// const theme = useThemeObj();
	// const matches = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Grid
			container
			// justifyContent={"flex-end"}
			// alignItems={"stretch"}
			spacing={4}
		>
			{
				cardContentArr.map(({icon}, index) => {

					const i18Accessor = `goalSection.${index}`;
					const title = t(`${i18Accessor}.title`);
					const text = t(`${i18Accessor}.text`);

					return (
						<Grid
							item
							key={`knowledge-section-${i18Accessor}`}
							sm={12}
							md={4}
						>
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
