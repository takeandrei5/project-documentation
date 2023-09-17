import { Box, Link, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';

import { ButtonC } from '../../../components/ButtonC';
import TextFieldC from '../../../components/TextFieldC/TextFieldC';
import { CREATE_PROJECT_INPUT } from './config';
import { type PRDFormComponentProps } from './types';

const PRDFormComponent: React.FC<PRDFormComponentProps> = ({ control, handleOnSubmit }) => {
	return (
		<Box component='form' onSubmit={handleOnSubmit} sx={{ '& > #wrapper_create-project': { mt: '1rem' } }}>
			<Typography variant='largeBold' sx={(theme) => ({ color: theme.palette.textColor[100] })} fontWeight={600}>
				Enter project name
			</Typography>
			<Controller
				defaultValue=''
				control={control}
				name={CREATE_PROJECT_INPUT.Name}
				render={({ formState: { errors }, field: { onChange, value } }) => (
					<TextFieldC
						id={CREATE_PROJECT_INPUT.Id}
						label={CREATE_PROJECT_INPUT.Label}
						name={CREATE_PROJECT_INPUT.Name}
						onChange={onChange}
						value={value}
						hasError={!!errors[CREATE_PROJECT_INPUT.Name]}
					/>
				)}
			/>
			<Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mt: '1rem', gap: '1rem' }}>
				<ButtonC onClick={console.log} size='large' variant='primary' type='submit'>
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
