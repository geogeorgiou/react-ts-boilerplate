import React, { FC } from "react";
import TextField from "@material-ui/core/TextField";
import { Controller, RegisterOptions } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { LocalesNsOption } from "../../context/LangContextProvider";

type TextFieldWrapperProps = {
	control: any;
	label: string;
	name: string;
	defaultValue?: string;
	rules?: RegisterOptions;
	[key: string]: any;
}

/**
 * Component bound with RHF framework to produce a localised TextField with rules functionality
 * @param control
 * @param label
 * @param placeholder
 * @param name
 * @param defaultValue
 * @param rules
 * @param muiProps - mui props applied to the Mui TextField part of the component
 * @constructor
 */
const TextFieldWrapper: FC<TextFieldWrapperProps> =
	({
		 control,
		 label,
		 placeholder,
		 name ,
		 defaultValue,
		 rules,
		 ...muiProps
	}) => {

	const { t } = useTranslation([LocalesNsOption.Common, LocalesNsOption.Translation])

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue || ""} //if none defined setup as empty
			rules={rules}
			render={({ field, fieldState: {error, invalid} }) =>
				<TextField
					{...field}
					{...muiProps}
					label={t(label) || ""}
					placeholder={t(placeholder) || ""}
					error={invalid}
					helperText={invalid ? t(error?.message as string) : ""}
					fullWidth
				/>}
		/>
	);

};

export default TextFieldWrapper;