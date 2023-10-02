import { Box, Typography, type Theme } from '@mui/material';
import { Controller } from 'react-hook-form';

import { ButtonC } from '../../../components/ButtonC';
import TextFieldC from '../../../components/TextFieldC/TextFieldC';
import { CREATE_PROJECT_INPUT } from './config';
import type { CreateProjectFormComponentProps } from './types';

const CreateProjectFormComponent: React.FC<CreateProjectFormComponentProps> = ({ control, handleOnSubmit }) => {
	return (
		<Box
			component='form'
			onSubmit={handleOnSubmit}
			sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem', '& > #wrapper_create-project': { mt: '1rem' } }}>
			<Typography align='center' variant='largeBold' sx={(theme: Theme) => ({ color: theme.palette.textColor[100] })}>
				{CREATE_PROJECT_INPUT.Title}
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
						errorMessage={errors[CREATE_PROJECT_INPUT.Name]?.message}
					/>
				)}
			/>
			<ButtonC size='large' variant='primary' type='submit'>
				{CREATE_PROJECT_INPUT.SubmitButton}
			</ButtonC>
		</Box>
	);
};

export default CreateProjectFormComponent;
