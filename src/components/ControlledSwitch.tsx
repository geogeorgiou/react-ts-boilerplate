import * as React from 'react';
// import Switch from '@mui/material/Switch';
import { FC, useEffect } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from '@material-ui/core/Switch';

type ControlledSwitchProps = {
	isChecked?: boolean
	handleChange?: (args?: any) => void
	[key: string]: any
}

const ControlledSwitch: FC<ControlledSwitchProps> = ({ isChecked, handleChange, ...rest}) => {
	const [checked, setChecked] = React.useState(isChecked || false);

	const handleChecked = (event) => {
		setChecked(event.target.checked);
	};

	useEffect(() => {

		//if exists execute
		handleChange && handleChange();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[checked])

	return (
		<FormControlLabel
			control={
				<Switch
					checked={checked}
					onChange={handleChecked}
					// inputProps={{ "aria-label": "secondary checkbox" }}
				/>
			}
			label={"label"}
			labelPlacement="start"
			{...rest}
		/>
	);
}

export default ControlledSwitch;