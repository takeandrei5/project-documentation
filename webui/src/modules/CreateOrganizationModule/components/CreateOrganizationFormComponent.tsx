import { Box, Typography, type Theme } from '@mui/material';
import { Controller } from 'react-hook-form';

import { ButtonC } from '../../../components/ButtonC';
import TextFieldC from '../../../components/TextFieldC/TextFieldC';
import { CREATE_ORGANIZATION_INPUT } from './config';
import type { CreateOrganizationFormComponentProps } from './types';

const CreateOrganizationFormComponent: React.FC<CreateOrganizationFormComponentProps> = ({ control, clearErrors, handleOnSubmit }) => {
	return (
		<Box
			component='form'
			onSubmit={handleOnSubmit}
			sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem', '& > #wrapper_create-project': { mt: '1rem' } }}>
			<Typography align='center' variant='largeBold' sx={(theme: Theme) => ({ color: theme.palette.textColor[100] })}>
				{CREATE_ORGANIZATION_INPUT.Title}
			</Typography>
			<Controller
				defaultValue=''
				control={control}
				name={CREATE_ORGANIZATION_INPUT.Name}
				render={({ formState: { errors }, field: { onChange, value } }) => (
					<TextFieldC
						id={CREATE_ORGANIZATION_INPUT.Id}
						label={CREATE_ORGANIZATION_INPUT.Label}
						name={CREATE_ORGANIZATION_INPUT.Name}
						onChange={(event: string | React.ChangeEvent<Element>) => {
							clearErrors('organizationName');
							onChange(event);
						}}
						value={value}
						hasError={!!errors[CREATE_ORGANIZATION_INPUT.Name]}
						errorMessage={errors[CREATE_ORGANIZATION_INPUT.Name]?.message}
					/>
				)}
			/>
			<ButtonC size='large' variant='primary' type='submit'>
				{CREATE_ORGANIZATION_INPUT.SubmitButton}
			</ButtonC>
		</Box>
	);
};

export default CreateOrganizationFormComponent;
