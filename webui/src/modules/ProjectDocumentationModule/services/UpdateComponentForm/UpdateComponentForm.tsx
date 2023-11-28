import { Box, Divider, Skeleton, Typography, type Theme } from '@mui/material';
import { Controller } from 'react-hook-form';
import { CheckboxFieldC } from '../../../../components/CheckboxFieldC/index.tsx';
import { DropdownFieldC } from '../../../../components/DropdownFieldC/index.tsx';
import { TextFieldC } from '../../../../components/index.tsx';
import useUpdateComponentForm from './hooks.ts';
import type { UpdateComponentFormProps } from './types.ts';

const UpdateComponentForm: React.FC<UpdateComponentFormProps> = ({ control, dirtyFields, getValues }) => {
	const { isLoadingJiraIssue, isLoadingJiraProject, jiraIssueData, jiraIssueIdValue, jiraProjectData, mapJiraProjectToDropdownHandler, mapJiraIssueToDropdownHandler } =
		useUpdateComponentForm(getValues);

	if (isLoadingJiraProject) {
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
							disabled
							id='jiraProjectId'
							label='Select one project'
							name='jiraProjectId'
							onChange={onChange}
							options={!jiraProjectData ? [] : mapJiraProjectToDropdownHandler(jiraProjectData.project)}
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
			{jiraIssueIdValue && (
				<>
					{isLoadingJiraIssue ? (
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
											disabled
											id='jiraIssue'
											label='Select one Jira issue'
											name='jiraIssue'
											onChange={onChange}
											options={!jiraIssueData ? [] : mapJiraIssueToDropdownHandler(jiraIssueData.issue)}
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
								<Typography>Update component</Typography>
							</Divider>
							<Controller
								control={control}
								defaultValue=''
								name='componentTitle'
								render={({ field: { onBlur, onChange, value }, formState: { errors } }) => (
									<Box onBlur={onBlur}>
										<TextFieldC id='componentTitle' label='Component title' onChange={onChange} value={value} />
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
										<TextFieldC id='componentDescription' label='Component Description' multiline onChange={onChange} value={value} />
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
export default UpdateComponentForm;
