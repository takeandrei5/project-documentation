import { Box, Icon, InputLabel, List, Modal, Paper, TextField, Typography } from '@mui/material';
import { NavigationMenuItem } from '../NavigationMenuItem';
import { useNavigationMenuHeader } from './hooks';
import type { NavigationMenuHeaderProps } from './types';
import { ButtonC } from '../../../../components';
import CloseIcon from '@mui/icons-material/Close';
import TextFieldC from '../../../../components/TextFieldC/TextFieldC';
import { CREATE_PROJECT_INPUT } from '../../../CreatePRDModule/components/config';

const NavigationMenuHeader:React.FC<NavigationMenuHeaderProps> = ({ setTreeData, treeData }) => {
	const { isModalOpen, onClickHandler, onCloseHandler, onCreateProjectButtonClickedHandler, onProjectNameChangeHandler, onProjectNameKeyPressedHandler, projectName } =
					useNavigationMenuHeader(setTreeData, treeData);

	return (
		<>
			<List sx={{ padding: 0 }}>
				<NavigationMenuItem icon='face' onClick={onClickHandler} text="Alin's Notion" />
				<NavigationMenuItem icon='add_circle_outline' onClick={onClickHandler} text='New project' />
				<NavigationMenuItem icon='folder_open' onClick={onClickHandler} text='Shared' />
			</List>
			<Modal open={isModalOpen} onClose={onCloseHandler} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Paper
					sx={{
						display: 'flex',
						justifyContent: 'center',
						flexDirection: 'column',
						gap: '0.75rem',
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 500,
						bgcolor: 'background.paper',
						boxShadow: 5,
						p: '1.5rem 2rem',
						borderRadius: '0.5rem',
						outline: 0,
						'& > button': {
							padding: '0.75rem 1rem',
							width: '100%',
							mt: '1rem'
						}
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<Typography variant='largeBold' sx={(theme) => ({ color: theme.palette.textColor[100] })} fontWeight={600}>
							New project
						</Typography>
						<Icon sx={{ cursor: 'pointer' }} onClick={onCloseHandler}>close_icon</Icon>
					</Box>
					<TextFieldC id={CREATE_PROJECT_INPUT.id}
											name={CREATE_PROJECT_INPUT.name}
											label={CREATE_PROJECT_INPUT.label}
											type={CREATE_PROJECT_INPUT.type}
											value={projectName}
											onChange={onProjectNameChangeHandler}
											onKeyPress={onProjectNameKeyPressedHandler}
					/>
					<ButtonC
						variant='primary'
						onClick={onCreateProjectButtonClickedHandler}
					>
						Create project
					</ButtonC>
				</Paper>
			</Modal>
		</>
	);
};
export default NavigationMenuHeader;
