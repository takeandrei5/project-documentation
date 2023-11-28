import { Box, Divider, Typography, type Theme, Skeleton } from '@mui/material';
import { Controller } from 'react-hook-form';
import { CheckboxFieldC } from '../../../../components/CheckboxFieldC/index.tsx';
import { DropdownFieldC } from '../../../../components/DropdownFieldC/index.tsx';
import { TextFieldC } from '../../../../components/index.tsx';
import useCreateComponentForm from './hooks.ts';
import type { CreateComponentFormProps } from './types.ts';

const CreateComponentForm: React.FC<CreateComponentFormProps> = ({ control, dirtyFields, getValues, setValue }) => {
	const {
		isLoadingJiraIssues,
		isLoadingJiraProjects,
		jiraIssueData,
		jiraIssueIdValue,
		jiraProjectsData,
		jiraProjectIdValue,
		mapJiraIssuesToDropdownHandler,
		mapJiraProjectsToDropdownHandler
	} = useCreateComponentForm(getValues, setValue);

	if (isLoadingJiraProjects) {
		return <Skeleton animation='wave' variant='rounded' width='27rem' height='3rem' />;
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
			<Controller
				control={control}
				defaultValue=''
				name='jiraProjectId'
				render={({ field: { onBlur, onChange, value }, formState: { errors } }) => (
					<Box onBlur={onBlur}>
						<DropdownFieldC
							id='jiraProjectId'
							label='Select one project'
							name='jiraProjectId'
							onChange={onChange}
							options={!jiraProjectsData ? [] : mapJiraProjectsToDropdownHandler(jiraProjectsData.projects)}
							value={value}
						/>
						{errors.jiraProjectId && (
							<Typography sx={(theme: Theme) => ({ color: theme.palette.red[80] })} variant='smallMedium'>
								{errors.jiraProjectId.message}
							</Typography>
						)}
					</Box>
				)}
			/>
			{jiraProjectIdValue && (
				<>
					{isLoadingJiraIssues ? (
						<Skeleton animation='wave' variant='rounded' width='27rem' height='3rem' />
					) : (
						<>
							<Divider>Import an existing Jira issue</Divider>
							<Controller
								control={control}
								defaultValue=''
								name='jiraIssueId'
								render={({ field: { onBlur, onChange, value }, formState: { errors } }) => (
									<Box onBlur={onBlur}>
										<DropdownFieldC
											label='Select one Jira issue'
											id='jiraIssue'
											name='jiraIssue'
											onChange={onChange}
											options={!jiraIssueData ? [] : mapJiraIssuesToDropdownHandler(jiraIssueData.issues)}
											value={value}
										/>
										{errors && errors.jiraIssueId && (
											<Typography sx={(theme: Theme) => ({ color: theme.palette.red[80] })} variant='smallMedium'>
												{errors.jiraIssueId.message}
											</Typography>
										)}
									</Box>
								)}
							/>
							<Divider>
								<Typography>Create a new component</Typography>
							</Divider>
							<Controller
								control={control}
								defaultValue=''
								name='componentTitle'
								render={({ field: { onBlur, onChange, value }, formState: { errors } }) => (
									<Box onBlur={onBlur}>
										<TextFieldC disabled={!!jiraIssueIdValue} id='componentTitle' label='Component title' onChange={onChange} value={value} />
										{errors.componentTitle && (
											<Typography sx={(theme: Theme) => ({ color: theme.palette.red[80] })} variant={'smallMedium'}>
												{errors.componentTitle.message}
											</Typography>
										)}
									</Box>
								)}
							/>
							<Controller
								control={control}
								defaultValue=''
								name='componentDescription'
								render={({ field: { onBlur, onChange, value } }) => (
									<Box onBlur={onBlur}>
										<TextFieldC disabled={!!jiraIssueIdValue} id='componentDescription' label='Component Description' multiline onChange={onChange} value={value} />
									</Box>
								)}
							/>
							{dirtyFields.componentTitle && !jiraIssueIdValue && (
								<Controller
									control={control}
									defaultValue={false}
									name='syncWithJira'
									render={({ field: { onChange, value }, formState: { errors } }) => (
										<>
											<CheckboxFieldC id='syncWithJira' label='Sync with Jira?' name='syncWithJira' onChange={onChange} value={value} />
											{errors.syncWithJira && (
												<Typography sx={(theme: Theme) => ({ color: theme.palette.red[80] })} variant={'smallMedium'}>
													{errors.syncWithJira.message}
												</Typography>
											)}
										</>
									)}
								/>
							)}
						</>
					)}
				</>
			)}
		</Box>
	);
};
export default CreateComponentForm;
