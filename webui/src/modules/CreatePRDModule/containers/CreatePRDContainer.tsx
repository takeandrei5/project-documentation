import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const CreatePRDContainer: React.FC = () => {
  const [projectName, setProjectName] = useState<string>('');

	return (
		<Box sx={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
			<Box
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
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setProjectName(e.target.value)}
          value={projectName}
				/>
				<Button
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
		</Box>
	);
};

export default CreatePRDContainer;
