import express, { Request, Response, Router } from 'express';
import { createDefaultAxiosInstance } from '../../../axios';
import { hasAccessToken, hasRefreshToken, validateAccess } from '../../../middlewares';
import { ReadAllProjects, ReadAllProjectIssues } from './types';
import { ReqQuery } from '../../../middlewares/types';

const jiraProjectsRouter: Router = express.Router();

const JIRA_API_BASE_URL = 'https://api.atlassian.com/ex/jira/';

const jiraApiAxiosInstance = createDefaultAxiosInstance(JIRA_API_BASE_URL);

jiraProjectsRouter.get(
	'/',
	hasAccessToken,
	hasRefreshToken,
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
	'/:id/issues',
	hasAccessToken,
	hasRefreshToken,
	validateAccess,
	async (req: Request<{ id: string }, {}, {}, ReqQuery>, res: Response<ReadAllProjectIssues.ControllerResponse | string>) => {
		const readJiraProjectsResult = await jiraApiAxiosInstance.get<ReadAllProjectIssues.ApiResponse>(
			`${req.query.accessibleResourceId}/rest/api/3/search?jql=project=${req.params.id}&fields=summary`,
			{
				headers: {
					Authorization: `Bearer ${req.query.accessToken}`
				}
			}
		);

		console.log(readJiraProjectsResult.status);
		if (readJiraProjectsResult.status >= 500) {
			return res.status(500).send('Internal server error');
		}

		const mappedResult: ReadAllProjectIssues.ControllerResponse = {
			total: readJiraProjectsResult.data.total,
			issues: readJiraProjectsResult.data.issues.map(
				(issue: ReadAllProjectIssues.ApiIssue) =>
					({
						id: issue.id,
						key: issue.key,
						summary: issue.fields.summary
					} satisfies ReadAllProjectIssues.ControllerIssue)
			)
		};

		return res.send(mappedResult);
	}
);

export default jiraProjectsRouter;
