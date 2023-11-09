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

const accessToken =
	'eyJraWQiOiJmZTM2ZThkMzZjMTA2N2RjYTgyNTg5MmEiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJlZDI3NDAwOC02OGY4LTQ4YjctYmJlZS1jNjcyY2M5YzczNWEiLCJzdWIiOiI3MTIwMjA6MzgzM2YzNDctZjhiYS00NWY2LTg1OGUtY2Y0Y2MyZGRlNGI3IiwibmJmIjoxNjk5NDgzMTY2LCJpc3MiOiJodHRwczovL2F1dGguYXRsYXNzaWFuLmNvbSIsImlhdCI6MTY5OTQ4MzE2NiwiZXhwIjoxNjk5NDg2NzY2LCJhdWQiOiJRbUxhTk9mT2lvU0R4cmFWVW5tTHVCZjlVcUthZThseiIsImh0dHBzOi8vaWQuYXRsYXNzaWFuLmNvbS9hdGxfdG9rZW5fdHlwZSI6IkFDQ0VTUyIsInNjb3BlIjoid3JpdGU6d2ViaG9vazpqaXJhIHJlYWQ6amlyYS13b3JrIHJlYWQ6ZmllbGQ6amlyYSByZWFkOmlzc3VlLW1ldGE6amlyYSBvZmZsaW5lX2FjY2VzcyBtYW5hZ2U6amlyYS13ZWJob29rIHdyaXRlOmppcmEtd29yayByZWFkOm1lIHJlYWQ6cHJvamVjdDpqaXJhIHJlYWQ6amlyYS11c2VyIiwiY2xpZW50X2lkIjoiUW1MYU5PZk9pb1NEeHJhVlVubUx1QmY5VXFLYWU4bHoiLCJodHRwczovL2F0bGFzc2lhbi5jb20vZmlyc3RQYXJ0eSI6ZmFsc2UsImh0dHBzOi8vYXRsYXNzaWFuLmNvbS92ZXJpZmllZCI6dHJ1ZSwiaHR0cHM6Ly9pZC5hdGxhc3NpYW4uY29tL3Byb2Nlc3NSZWdpb24iOiJ1cy1lYXN0LTEiLCJodHRwczovL2F0bGFzc2lhbi5jb20vc3lzdGVtQWNjb3VudElkIjoiNzEyMDIwOmU5ZGEzYTY2LWQxMDItNDA0ZC05Y2E5LTQ4YmM4ZWY3MTgxYSIsImh0dHBzOi8vYXRsYXNzaWFuLmNvbS9lbWFpbERvbWFpbiI6ImdtYWlsLmNvbSIsImh0dHBzOi8vYXRsYXNzaWFuLmNvbS8zbG8iOnRydWUsImh0dHBzOi8vaWQuYXRsYXNzaWFuLmNvbS92ZXJpZmllZCI6dHJ1ZSwiaHR0cHM6Ly9pZC5hdGxhc3NpYW4uY29tL3VqdCI6IjdhY2I5ZjI3LTkxNzQtNDZmNS04MmUxLTFhMDUzYzI3ZTQ3MiIsImh0dHBzOi8vYXRsYXNzaWFuLmNvbS9zeXN0ZW1BY2NvdW50RW1haWwiOiI3ZThmZDVmNy1hMjdiLTQ5YTMtYTRmOS1iN2Y3MDc4NTNhMDdAY29ubmVjdC5hdGxhc3NpYW4uY29tIiwiaHR0cHM6Ly9hdGxhc3NpYW4uY29tL29hdXRoQ2xpZW50SWQiOiJRbUxhTk9mT2lvU0R4cmFWVW5tTHVCZjlVcUthZThseiIsImh0dHBzOi8vaWQuYXRsYXNzaWFuLmNvbS9zZXNzaW9uX2lkIjoiODIyOWUxNDEtMzdkYi00ZWQ2LWE0YTgtMWM0Y2E5NzZkOThlIiwiaHR0cHM6Ly9hdGxhc3NpYW4uY29tL3N5c3RlbUFjY291bnRFbWFpbERvbWFpbiI6ImNvbm5lY3QuYXRsYXNzaWFuLmNvbSJ9.DFlUuIiOYN1Sa2WM1Ny582qXX7LEOyVrs7vpS6-rtngeKN25IM_xw4Q2kAu8NOpC0Mmdp-Alqx3lRjnck3rSghW5DYBeLvUD0yL_a50S4sP26ig9gKPGkVSoiPT-Q83nc8Y4-JaDg5HbVMs4I40J57rSf_cmJ3cfOcMUdjTvyBH1jOl5PkrKhCdBKNyNz832rZ9AZmN8WkCRHL5OzMn_roMt0prWusewyhrPo_VpOK9m6H_gXRRzwxL-WP-IsifjDuJPJA6lrzpOBQN2bS038ddADObeVv0-GUTOUceie9WSWP_CcEGr3XO2ErAcUpzjC2x8suGCEHwUtZSpSg185Q';
const refreshToken =
	'eyJraWQiOiI1MWE2YjE2MjRlMTQ5ZDFiYTdhM2VmZjciLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI0YzNmMjJmNC0yNTQ4LTQ0NmEtODhjZC0xMDUwMWE3NDFlOTkiLCJzdWIiOiI3MTIwMjA6MzgzM2YzNDctZjhiYS00NWY2LTg1OGUtY2Y0Y2MyZGRlNGI3IiwibmJmIjoxNjk5NDc5MzI2LCJpc3MiOiJodHRwczovL2F1dGguYXRsYXNzaWFuLmNvbSIsImlhdCI6MTY5OTQ3OTMyNiwiZXhwIjoxNzA3MjU1MzI2LCJhdWQiOiJRbUxhTk9mT2lvU0R4cmFWVW5tTHVCZjlVcUthZThseiIsImh0dHBzOi8vaWQuYXRsYXNzaWFuLmNvbS9yZWZyZXNoX2NoYWluX2lkIjoiUW1MYU5PZk9pb1NEeHJhVlVubUx1QmY5VXFLYWU4bHotNzEyMDIwOjM4MzNmMzQ3LWY4YmEtNDVmNi04NThlLWNmNGNjMmRkZTRiNy1lM2RhMzgyZi1jMThiLTRjNTMtYjZjYi0yOWJkZmM0ZjIwOGIiLCJodHRwczovL2lkLmF0bGFzc2lhbi5jb20vYXRsX3Rva2VuX3R5cGUiOiJST1RBVElOR19SRUZSRVNIIiwidmVyaWZpZWQiOiJ0cnVlIiwiaHR0cHM6Ly9pZC5hdGxhc3NpYW4uY29tL3Byb2Nlc3NSZWdpb24iOiJ1cy1lYXN0LTEiLCJodHRwczovL2lkLmF0bGFzc2lhbi5jb20vcGFyZW50X2FjY2Vzc190b2tlbl9pZCI6IjVhMWU5MTQ4LTBjOGEtNGViMi1hNjZhLWIyYjU0YmQ1ZDdjMiIsImh0dHBzOi8vaWQuYXRsYXNzaWFuLmNvbS91anQiOiJmMDc1MzY1YS1hYWMzLTQ1YmEtYjhlOC0yZTViNmE4ZmU2ZGIiLCJodHRwczovL2lkLmF0bGFzc2lhbi5jb20vdmVyaWZpZWQiOnRydWUsInNjb3BlIjoid3JpdGU6d2ViaG9vazpqaXJhIHJlYWQ6amlyYS13b3JrIHJlYWQ6ZmllbGQ6amlyYSByZWFkOmlzc3VlLW1ldGE6amlyYSBvZmZsaW5lX2FjY2VzcyBtYW5hZ2U6amlyYS13ZWJob29rIHdyaXRlOmppcmEtd29yayByZWFkOm1lIHJlYWQ6cHJvamVjdDpqaXJhIHJlYWQ6amlyYS11c2VyIiwiaHR0cHM6Ly9pZC5hdGxhc3NpYW4uY29tL3Nlc3Npb25faWQiOiI4MjI5ZTE0MS0zN2RiLTRlZDYtYTRhOC0xYzRjYTk3NmQ5OGUifQ.QZdR-_3hfXL-uhXdl2Lp7u0AGLrDos0xb3hNsoRdD9ZcJKM3h74Qxxyscm4PEcrxTAirQCPi8zoggylQ-K1LSUF2TamCpGfuKswsGwmtQ6gWhPhhG8hqKreuZw9TUEf5_IS_oqlSJ8zRY8ef_mKmlMmQZaBAnfSbNtUSBxQLgspT7PzwIe6qsOk8NxCsccBsCQcpMwmYQCocXME2wxpHR5A4eSPqzOQm-Ty1kTkFKsD0lyjWLgXB634b-NTZNGwjaX2mfDM6T-ZufiC3e4jWjMywmCNQ7GNC-KBNopYGjkTEDgrz66pR0oURNjSV3FWeO1Uj7iW7Kjr8TExOgxePQQ&';
const accessibleResourceId = '63451206-ea07-4005-b40c-ecfb041e82cc';

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
		const apiResponse = await axios.get(`/api/jira/projects?refreshToken=${refreshToken}&accessToken=${accessToken}&accessibleResourceId=${accessibleResourceId}`);

		if (apiResponse.status !== 200) {
			window.location.href = `/api/jira/auth?redirectUrl=${window.location.href}`;
			return;
		}

		return apiResponse.data;
	});

	const { data: issuesData, isLoading: isLoadingIssues } = useQuery(
		['issues', projectValue],
		async () => {
			const apiResponse = await axios.get(
				`/api/jira/projects/${projectValue}/issues?refreshToken=${refreshToken}&accessToken=${accessToken}&accessibleResourceId=${accessibleResourceId}`
			);

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
