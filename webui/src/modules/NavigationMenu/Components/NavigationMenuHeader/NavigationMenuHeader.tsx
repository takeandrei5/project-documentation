import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FaceIcon from '@mui/icons-material/Face';
import { Button, List, ListItem, ListItemIcon, Modal, Paper, TextField, Typography } from '@mui/material';
import { useNavigationMenuHeader } from './hooks';
import type { NavigationMenuHeaderProps } from './types';
import { NavigationMenuItem } from '../NavigationMenuItem';

const NavigationMenuHeader: React.FC<NavigationMenuHeaderProps> = ({ setTreeData, treeData }) => {
	const { isModalOpen, onClickHandler, onCloseHandler, onCreateProjectButtonClickedHandler, onProjectNameChangeHandler, onProjectNameKeyPressedHandler, projectName } =
		useNavigationMenuHeader(setTreeData, treeData);

	return (
		<>
			<List sx={{ padding: 0 }}>
				<NavigationMenuItem icon={<FaceIcon />} onClick={onClickHandler} text={"Alin's Notion"} />
				<NavigationMenuItem icon={<AddCircleOutlineIcon />} onClick={onClickHandler} text={'New project'} />
			</List>
			<Modal open={isModalOpen} onClose={onCloseHandler} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Paper
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
						gap: '0.75rem',
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 250,
						bgcolor: 'background.paper',
						boxShadow: 5,
						p: 4,
						outline: 0
					}}>
					<Typography variant='h6' component='h1' fontWeight={600}>
						Enter project name
					</Typography>
					<TextField
						placeholder='Type your project name'
						variant='outlined'
						size='small'
						InputProps={{
							sx: {
								borderRadius: '0.75rem',
								border: '1px solid #000000',
								outline: 0,
								width: '12rem',
								'& > fieldset': {
									border: 'none'
								}
							}
						}}
						onKeyPress={onProjectNameKeyPressedHandler}
						onChange={onProjectNameChangeHandler}
						value={projectName}
					/>
					<Button
						variant='contained'
						onClick={onCreateProjectButtonClickedHandler}
						sx={{
							borderRadius: '0.5rem',
							boxShadow: 0,
							backgroundColor: '#8FD14F',
							color: '#000000',
							mt: '1rem',
							':hover': {
								backgroundColor: '#8FD14F'
							}
						}}>
						Create project
					</Button>
				</Paper>
			</Modal>
		</>
	);
};
export default NavigationMenuHeader;
