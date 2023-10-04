import { Box, type Theme, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { TextFieldC } from '../../../../components/TextFieldC';
import type { FormComponentViewProps } from './types';
import { ButtonC } from '../../../../components';

const FormComponentView: React.FC<FormComponentViewProps> = ({ id, label, title, name, onSubmitHandler, control, submitButton }) => {
	return (
		<Box
			component='form'
			onSubmit={onSubmitHandler}
			sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem', '& > #wrapper_create-project': { mt: '1rem' } }}>
			<Typography align='center' variant='largeBold' sx={(theme: Theme) => ({ color: theme.palette.textColor[100] })}>
				{title}
			</Typography>
			<Controller
				defaultValue=''
				control={control}
				name='projectName'
				render={({ formState: { errors }, field: { onChange, value } }) => (
					<TextFieldC
						id={id}
						label={label}
						name={name}
						onChange={onChange}
						value={value}
						hasError={!!errors['projectName']}
						errorMessage={errors['projectName']?.message || undefined}
					/>
				)}
			/>
			<ButtonC size='large' variant='primary' type='submit'>
				{submitButton}
			</ButtonC>
		</Box>
	);
};

export default FormComponentView;
