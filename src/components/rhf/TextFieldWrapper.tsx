import React, { FC } from "react";
import TextField from "@material-ui/core/TextField";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { LocalesNsOption } from "../../context/LangContextProvider";

type TextFieldWrapperProps = {
	label: string;
	name: string;
	defaultValue?: string;
	rules?: any;
	// [key: string]: any;
}

/**
 * Component bound with RHF framework to produce a localised TextField with rules functionality
 * @param label
 * @param name
 * @param defaultValue
 * @param rules
 * @constructor
 */
const TextFieldWrapper: FC<TextFieldWrapperProps> = ({ label, name , defaultValue, rules}) => {

	const { t } = useTranslation(LocalesNsOption.Translation)
	const { control } = useForm();

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			rules={rules}
			render={({ field }) =>
				<TextField
					{...field}
					label={t(label)}
					fullWidth
				/>}
		/>
	);

};

export default TextFieldWrapper;