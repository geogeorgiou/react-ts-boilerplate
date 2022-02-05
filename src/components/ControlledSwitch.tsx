import * as React from "react";
// import Switch from '@mui/material/Switch';
import { FC, useEffect } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { useFirstRender } from "../hooks/useFistRender";

type ControlledSwitchProps = {
	isChecked?: boolean;
	handleChange?: (args?: any) => void;
	labelConfig?: LabelConfigType["labelConfig"];
	[key: string]: any;
};

type LabelConfigType = {
	labelConfig: {
		checked: React.ReactNode;
		unchecked: React.ReactNode;
	};
};

const ControlledSwitch: FC<ControlledSwitchProps> = ({ isChecked, handleChange, label, labelConfig, ...rest }) => {
	const [checked, setChecked] = React.useState(isChecked || false);
	const isFirstRender = useFirstRender();

	const TransformedLabelJsx = labelConfig ? (checked ? labelConfig.checked : labelConfig.unchecked) : label;

	const handleChecked = (event) => {
		setChecked(event.target.checked);
	};

	useEffect(() => {
		//if exists execute
		!isFirstRender && handleChange && handleChange();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [checked]);

	return (
		<FormControlLabel
			control={
				<Switch
					checked={checked}
					onChange={handleChecked}
					// inputProps={{ "aria-label": "secondary checkbox" }}
				/>
			}
			label={labelConfig ? <TransformedLabelJsx style={{ marginTop: "0.3rem" }} /> : label}
			labelPlacement="start"
			{...rest}
		/>
	);
};

export default ControlledSwitch;
