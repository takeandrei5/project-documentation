import { Box, Button, Link, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';

import { type PRDFormComponentProps } from './types';
import TextFieldC from '../../../components/TextFieldC/TextFieldC';
import { CREATE_PROJECT_INPUT } from './config';
import { ButtonC } from '../../../components/ButtonC';

const PRDFormComponent:React.FC<PRDFormComponentProps> = ({ control, handleOnSubmit }) => {

	return (
		<Box
			component='form'
			onSubmit={handleOnSubmit}
			sx={{ '& > #wrapper_create-project': { mt: '1rem' } }}
		>
			<Typography variant='largeBold' sx={(theme) => ({ color: theme.palette.textColor[100] })} fontWeight={600}>
				Enter project name
			</Typography>
			<Controller
				defaultValue=''
				control={control}
				name={CREATE_PROJECT_INPUT.name}
				render={({ formState: { errors }, field: { onChange, value } }) => (
					<TextFieldC id={CREATE_PROJECT_INPUT.id}
											label={CREATE_PROJECT_INPUT.label}
											name={CREATE_PROJECT_INPUT.name}
											type={CREATE_PROJECT_INPUT.type}
											onChange={onChange}
											value={value}
											hasError={!!errors[CREATE_PROJECT_INPUT.name]}
					/>
				)}
			/>
			<Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mt: '1rem' }}>
				<ButtonC
					variant='primary'
					type='submit'
				>
					Create project
				</ButtonC>
				<Link color='inherit' href='/project-description' underline='hover' fontWeight={500}>
					Skip
				</Link>
			</Box>
		</Box>
	);
};

export default PRDFormComponent;
