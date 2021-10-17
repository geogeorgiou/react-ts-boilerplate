import { SharedProps, SnackbarMessage, useSnackbar } from "notistack";
import { useCustomTranslation } from "../context/LangContextProvider";

export const useSnackbarCreator = () => {

	const { t } = useCustomTranslation();
	const { enqueueSnackbar } = useSnackbar();

	function enqueueCustomSnackbar(message: SnackbarMessage, options: SharedProps) {
		let messageTT;
		if (typeof message === "string")
			messageTT = t(message);
		else {
			messageTT = message;
		}

		return enqueueSnackbar(messageTT, options);
	}

	return { enqueueCustomSnackbar }

}

