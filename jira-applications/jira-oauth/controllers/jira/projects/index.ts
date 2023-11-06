import express, { Request, Response, Router } from 'express';
import { createDefaultAxiosInstance } from '../../../axios';
import { hasAccessToken, hasRefreshToken, validateAccess } from '../../../middlewares';
import { ReadMultipleProjects, ReadMultipleProjectIssues } from './types';
import { ReqQuery } from '../../../middlewares/types';

const jiraProjectsRouter: Router = express.Router();

const JIRA_API_BASE_URL = 'https://api.atlassian.com/ex/jira/';

const jiraApiAxiosInstance = createDefaultAxiosInstance(JIRA_API_BASE_URL);

jiraProjectsRouter.get(
	'/',
	hasAccessToken,
	hasRefreshToken,
	validateAccess,
	async (req: Request<{}, {}, {}, ReqQuery>, res: Response<ReadMultipleProjects.ControllerResponse | string>) => {
		const readJiraProjectsResult = await jiraApiAxiosInstance.get<ReadMultipleProjects.ApiResponse>(`${req.query.accessibleResourceId}/rest/api/3/project`, {
			headers: {
				Authorization: req.headers.authorization
			}
		});

		if (readJiraProjectsResult.status >= 500) {
			return res.status(500).send('Internal server error');
		}

		const mappedResult: ReadMultipleProjects.ControllerResponse = {
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
	async (req: Request<{ id: string }, {}, {}, ReqQuery>, res: Response<ReadMultipleProjectIssues.ControllerResponse | string>) => {
		const readJiraProjectsResult = await jiraApiAxiosInstance.get<ReadMultipleProjectIssues.ApiResponse>(
			`${req.query.accessibleResourceId}/rest/api/3/search?jql=project=${req.params.id}&fields=summary`,
			{
				headers: {
					Authorization: req.headers.authorization
				}
			}
		);

		console.log(readJiraProjectsResult.status);
		if (readJiraProjectsResult.status >= 500) {
			return res.status(500).send('Internal server error');
		}

		const mappedResult: ReadMultipleProjectIssues.ControllerResponse = {
			total: readJiraProjectsResult.data.total,
			issues: readJiraProjectsResult.data.issues.map(
				(issue: ReadMultipleProjectIssues.ApiIssue) =>
					({
						id: issue.id,
						key: issue.key,
						summary: issue.fields.summary
					} satisfies ReadMultipleProjectIssues.ControllerIssue)
			)
		};

		return res.send(mappedResult);
	}
);

export default jiraProjectsRouter;
