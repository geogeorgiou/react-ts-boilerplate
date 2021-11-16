import { DialogProps } from "@material-ui/core";
import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useModal } from "mui-modal-provider";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import { useCustomTranslation } from "../context/LangContextProvider";
import { SubmitButton } from "../components/section/contact/ContactForm";
import styled from "styled-components";

type Props = Omit<DialogProps, "open"> & {
	open?: boolean;
	title: string;
	content: React.ReactNode;
	onCancel?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	onConfirm?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	cancelText?: string;
	confirmText?: string;
};

const StyledDialogTitle = styled(DialogTitle)`
	.MuiTypography-root {
		font-weight: bold;
	}
`

const StyledDialogContentText = styled(DialogContentText)`
	color: black;
`

//  create the dialog you want to use
const SimpleDialog: React.FC<Props> = ({
										   title,
										   open,
										   content,
										   onCancel,
										   onConfirm,
										   cancelText,
										   confirmText,
										   ...props }) =>{

	const { t } = useCustomTranslation();
	const [modalOpen, setModalOpen] = useState<boolean>(open || true);

	const handleClose = () => {
		setModalOpen(false);
	};

	const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		onConfirm && onConfirm(event);
		handleClose();
	}

	const onDismiss = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		onCancel && onCancel(event);
		handleClose();
	}

	const getContentRendered = (content) => {

		if (typeof content === "string")
			return t(content)

		return null;

	}

	return (
		<Dialog
			open={modalOpen}
			onClose={handleClose}
			aria-labelledby={`alert-dialog-${title}`}
			aria-describedby={`alert-dialog-${title}-descr`}
			{...props}
		>
			<StyledDialogTitle id={`alert-dialog-${title}`}>{t(title)}</StyledDialogTitle>
			<DialogContent>
				<StyledDialogContentText id={`alert-dialog-${title}-descr`}>
					{getContentRendered(content)}
				</StyledDialogContentText>
			</DialogContent>
			<DialogActions>
				{cancelText &&
					<SubmitButton onClick={onDismiss} color="secondary">
						{t(cancelText)}
					</SubmitButton>
				}
				{confirmText &&
					<SubmitButton onClick={onSubmit} color="primary" autoFocus>
						{t(confirmText)}
					</SubmitButton>
				}
			</DialogActions>
		</Dialog>

	)

};

export const useModals = () => {

	const { showModal } = useModal();

	const cookiesModal = (props: Props) => {
		return (
			showModal(() => <SimpleDialog {...props} />)
		)
	}

	return { cookiesModal }

}