import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';

import type { PRDFormComponentProps } from './types';

const PRDFormComponent: React.FC<PRDFormComponentProps> = ({ control, handleOnSubmit }) => {
	return (
		<Box
			component='form'
			onSubmit={handleOnSubmit}
			sx={{
				borderRadius: '0.75rem',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
				gap: '0.75rem',
				boxShadow: 6,
				outline: 0,
				p: '2rem'
			}}>
			<Typography variant='h6' component='h1' fontWeight={600}>
				Enter project name
			</Typography>
			<Controller
				defaultValue=''
				control={control}
				name='prdName'
				render={({ formState: { errors }, field: { onChange, value } }) => (
					<>
						<TextField
              error={errors.prdName ? true : false}
							placeholder='Type your project name'
              label='Project name'
							variant='outlined'
							size='small'
              // helperText={errors.prdName?.message}
							InputProps={{
								sx: {
									width: '12rem',
								}
							}}
							onChange={onChange}
							value={value}
						/>
					</>
				)}
			/>
			<Button
				type='submit'
				variant='contained'
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
			<Link color='inherit' href='/project-description' underline='hover' fontWeight={500}>
				Skip
			</Link>
		</Box>
	);
};

export default PRDFormComponent;
