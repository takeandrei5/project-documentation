import { Box, Divider, Typography, type SelectChangeEvent } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { Controller } from 'react-hook-form';
import { TextFieldC } from '../../../../components';
import { CheckboxFieldC } from '../../../../components/CheckboxFieldC';
import { DropdownFieldC } from '../../../../components/DropdownFieldC';
import type { DropdownOption } from '../../../../components/DropdownFieldC/types.ts';
import axios from '../../../../utils/axios';
import type { CreateComponentFormCProps } from './types.ts';
import { readAllJiraIssuesApi, readAllJiraProjectsApi } from '../../../../api/jiraapi/index.ts';

export type ProjectsListProps = {
	projects: Project[];
	total: number;
};

export type Project = {
	id: number;
	key: string;
	name: string;
};

export type IssuesListProps = {
	issues: Issue[];
	total: number;
};

export type Issue = {
	id: number;
	key: string;
	summary: string;
};

const CreateComponentFormC: React.FC<CreateComponentFormCProps> = ({ control, dirtyFields, getValues }) => {
	const projectValue = getValues('project');
	const componentTitleValue = getValues('componentTitle');
	const componentDescriptionValue = getValues('componentDescription');

	const { data: projectsData, isLoading: isLoadingProjects } = useQuery(['projects'], async () => {
		const apiResponse = await readAllJiraProjectsApi();

		return apiResponse.data;
	});

	const { data: issuesData, isLoading: isLoadingIssues } = useQuery(
		['issues', projectValue],
		async () => {
			const apiResponse = await readAllJiraIssuesApi(projectValue);
			return apiResponse.data;
		},
		{ enabled: !!projectValue }
	);

	const { mutate: createIssue } = useMutation(async () => {
		const apiResponse = await axios.get(
			`/api/jira/projects/${projectValue}/issues/?refreshToken=${refreshToken}&accessToken=${accessToken}&accessibleResourceId=${accessibleResourceId}`,
			{
				data: {
					summary: componentTitleValue,
					description: componentDescriptionValue,
					projectId: projectValue
				}
			}
		);
		return apiResponse.data;
	});

	const mapProjectsToDropdownHandler = (projects: Project[]): DropdownOption[] => {
		return projects.map((project: Project) => {
			return { value: project.id.toString(), label: `${project.key}: ${project.name}` };
		});
	};

	const mapIssuesToDropdownHandler = (issues: Issue[]): DropdownOption[] => {
		return issues.map((issue: Issue) => {
			return { value: issue.id.toString(), label: `${issue.key}: ${issue.summary}` };
		});
	};

	const titleRef = useRef({ isComponentTitleDirty: false });

	useLayoutEffect(() => {
		if (dirtyFields.componentTitle) {
			titleRef.current.isComponentTitleDirty = true;
		}
	}, [dirtyFields.componentTitle]);

	useEffect(() => {
		const titleCurrentValue = titleRef.current;

		return () => {
			titleCurrentValue.isComponentTitleDirty = false;
		};
	}, []);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
			<Controller
				control={control}
				defaultValue={''}
				name='project'
				render={({ field: { onChange, value }, formState: { errors } }) => (
					<Box>
						<DropdownFieldC
							label='Select one project'
							id='project'
							name='project'
							onChange={(e: SelectChangeEvent) => onChange(e.target.value)}
							options={isLoadingProjects ? [] : mapProjectsToDropdownHandler(projectsData.projects)}
							value={value}
						/>
						{errors?.project && (
							<Typography sx={(theme) => ({ color: theme.palette.red[80] })} variant={'smallMedium'}>
								{errors.project.message}
							</Typography>
						)}
					</Box>
				)}
			/>
			{projectValue && (
				<>
					<Divider>
						<Typography>Placeholder title</Typography>
					</Divider>
					<Controller
						control={control}
						defaultValue=''
						name='issue'
						render={({ field: { onChange, value }, formState: { errors } }) => (
							<Box>
								<DropdownFieldC
									id={'issue'}
									value={value}
									name={'issue'}
									onChange={(e: SelectChangeEvent) => onChange(e.target.value)}
									label={'Select one issue'}
									options={isLoadingIssues ? [] : mapIssuesToDropdownHandler(issuesData.issues)}
								/>
								{errors && errors['issue'] && (
									<Typography sx={(theme) => ({ color: theme.palette.red[80] })} variant={'smallMedium'}>
										{errors['issue'].message}
									</Typography>
								)}
							</Box>
						)}
					/>
					<Controller
						control={control}
						defaultValue={''}
						name='componentTitle'
						render={({ field: { onChange, value }, formState: { errors } }) => (
							<Box>
								<TextFieldC id={'componentTitle'} value={value} onChange={onChange} label={'Component title'} />
								{errors && errors['componentTitle'] && (
									<Typography sx={(theme) => ({ color: theme.palette.red[80] })} variant={'smallMedium'}>
										{errors['componentTitle'].message}
									</Typography>
								)}
							</Box>
						)}
					/>
					{(componentTitleValue || titleRef.current.isComponentTitleDirty) && (
						<Controller
							control={control}
							defaultValue={false}
							name='syncWithJira'
							render={({ field: { onChange, value }, formState: { errors } }) => (
								<>
									<CheckboxFieldC id='jira' value={value} name='jira' onChange={onChange} label='Sync with Jira?' disabled={!componentTitleValue} />
									{errors?.syncWithJira && (
										<Typography sx={(theme) => ({ color: theme.palette.red[80] })} variant={'smallMedium'}>
											{errors.syncWithJira.message}
										</Typography>
									)}
								</>
							)}
						/>
					)}
				</>
			)}
		</Box>
	);
};
export default CreateComponentFormC;
