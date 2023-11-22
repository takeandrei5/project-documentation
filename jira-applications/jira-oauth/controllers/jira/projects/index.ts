import express, { Request, Response, Router } from 'express';
import { createDefaultAxiosInstance } from '../../../axios';
import { hasAccessToken, hasRefreshToken, validateAccess, validateAccessAndRefreshTokens } from '../../../middlewares';
import { ReqQuery } from '../../../middlewares/types';
import { ReadAllProjectIssues, ReadAllProjects, ReadOneProject } from './types';

const jiraProjectsRouter: Router = express.Router();

const JIRA_API_BASE_URL = 'https://api.atlassian.com/ex/jira/';

const jiraApiAxiosInstance = createDefaultAxiosInstance(JIRA_API_BASE_URL);

jiraProjectsRouter.get(
	'/',
	hasAccessToken,
	hasRefreshToken,
	validateAccessAndRefreshTokens,
	validateAccess,
	async (req: Request<{}, {}, {}, ReqQuery>, res: Response<ReadAllProjects.ControllerResponse | string>) => {
		const readJiraProjectsResult = await jiraApiAxiosInstance.get<ReadAllProjects.ApiResponse>(`${req.query.accessibleResourceId}/rest/api/3/project`, {
			headers: {
				Authorization: `Bearer ${req.query.accessToken}`
			}
		});

		if (readJiraProjectsResult.status >= 500) {
			return res.status(500).send('Internal server error');
		}

		const mappedResult: ReadAllProjects.ControllerResponse = {
			total: readJiraProjectsResult.data.length,
			projects: readJiraProjectsResult.data
		};

		return res.send(mappedResult);
	}
);

jiraProjectsRouter.get(
	'/:id/',
	hasAccessToken,
	hasRefreshToken,
	validateAccessAndRefreshTokens,
	validateAccess,
	async (req: Request<{ id: string }, {}, {}, ReqQuery>, res: Response<ReadOneProject.ControllerResponse | string>) => {
		const readJiraProjectResult = await jiraApiAxiosInstance.get<ReadOneProject.ApiResponse>(`${req.query.accessibleResourceId}/rest/api/3/project/${req.params.id}`, {
			headers: {
				Authorization: `Bearer ${req.query.accessToken}`
			}
		});

		if (readJiraProjectResult.status >= 500) {
			return res.status(500).send('Internal server error');
		}

		const mappedResult: ReadOneProject.ControllerResponse = {
			project: {
				id: readJiraProjectResult.data.id,
				key: readJiraProjectResult.data.key,
				name: readJiraProjectResult.data.name
			}
		};

		return res.send(mappedResult);
	}
);

jiraProjectsRouter.get(
	'/:id/issues',
	hasAccessToken,
	hasRefreshToken,
	validateAccessAndRefreshTokens,
	validateAccess,
	async (req: Request<{ id: string }, {}, {}, ReqQuery>, res: Response<ReadAllProjectIssues.ControllerResponse | string>) => {
		const readJiraProjectIssuesResult = await jiraApiAxiosInstance.get<ReadAllProjectIssues.ApiResponse>(
			`${req.query.accessibleResourceId}/rest/api/3/search?jql=project=${req.params.id}&fields=summary`,
			{
				headers: {
					Authorization: `Bearer ${req.query.accessToken}`
				}
			}
		);

		if (readJiraProjectIssuesResult.status >= 500) {
			return res.status(500).send('Internal server error');
		}

		const mappedResult: ReadAllProjectIssues.ControllerResponse = {
			total: readJiraProjectIssuesResult.data.total,
			issues: readJiraProjectIssuesResult.data.issues
				.map(
					(issue: ReadAllProjectIssues.ApiIssue) =>
						({
							id: issue.id,
							key: issue.key,
							summary: issue.fields.summary
						} satisfies ReadAllProjectIssues.Issue)
				)
				.sort((issue1: ReadAllProjectIssues.Issue, issue2: ReadAllProjectIssues.Issue) => {
					if (issue1.id < issue2.id) {
						return -1;
					} else if (issue1.id > issue2.id) {
						return 1;
					}

					return 0;
				})
		};

		return res.send(mappedResult);
	}
);

export default jiraProjectsRouter;
