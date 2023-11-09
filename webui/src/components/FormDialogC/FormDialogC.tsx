import { Box, Dialog, Typography } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import type { FormEvent } from 'react';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { ButtonC } from '../ButtonC';
import type { FormDialogCProps } from './types.ts';

const FormDialogC: React.FC<FormDialogCProps> = ({
	control,
	reset,
	title,
	content,
	description,
	componentTitleValue,
	isComponentTitleDirty,
	onSubmitHandler,
	issueValue,
	submitCallback
}: FormDialogCProps) => {
	const { isOpen, closeHandler, openHandler } = control;

	const titleRef = useRef({ isComponentTitleDirty: false });
	useLayoutEffect(() => {
		if (isComponentTitleDirty) {
			titleRef.current.isComponentTitleDirty = true;
		}
	}, [isComponentTitleDirty]);

	useEffect(() => {
		window.addEventListener('message', (event) => {
			const data = event.data;
			if (data.message !== 'OPEN_COMPONENT_MODAL') {
				return;
			}
			reset();
			openHandler();
		});

		return () => {
			window.removeEventListener('message', () => {
				return;
			});
			titleRef.current.isComponentTitleDirty = false;
		};
	}, []);

	const cancelHandler = () => {
		closeHandler();
		window.removeEventListener('message', () => {
			return;
		});
	};

	const createHandler = (ev: FormEvent<HTMLElement>) => {
		onSubmitHandler(ev);

		if (submitCallback) {
			submitCallback();
		}

		window.removeEventListener('message', () => {
			return;
		});
	};

	return (
		<Dialog
			open={isOpen}
			onClose={closeHandler}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
			sx={{
				'& .MuiPaper-root': {
					width: '30rem '
				}
			}}>
			<DialogTitle id='alert-dialog-title'>
				<Typography variant={'largeBold'} sx={(theme) => ({ color: theme.palette.textColor[100] })}>
					{title}
				</Typography>
			</DialogTitle>
			<DialogContent>
				{description && <DialogContentText>{description}</DialogContentText>}
				<Box component={'form'}>{content}</Box>
			</DialogContent>
			<DialogActions>
				<ButtonC size={'small'} variant={'secondary'} onClick={cancelHandler}>
					Cancel
				</ButtonC>
				{(componentTitleValue || titleRef.current.isComponentTitleDirty) && (
					<ButtonC size={'small'} disabled={!componentTitleValue} variant={'secondary'} onClick={createHandler}>
						Create
					</ButtonC>
				)}
				{issueValue && (
					<ButtonC size={'small'} variant={'secondary'} onClick={createHandler}>
						Import from Jira
					</ButtonC>
				)}
			</DialogActions>
		</Dialog>
	);
};
export default FormDialogC;
