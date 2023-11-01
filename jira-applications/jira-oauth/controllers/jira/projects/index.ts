import express, { Request, Response, Router } from 'express';
import { createDefaultAxiosInstance } from '../../../axios';
import { hasAccessToken, hasRefreshToken, validateAccessToken } from '../../../middlewares';
import { ReadMultipleProjects } from './types';

const jiraProjectsRouter: Router = express.Router();

const JIRA_API_BASE_URL = 'https://api.atlassian.com/ex/jira/';

const jiraApiAxiosInstance = createDefaultAxiosInstance(JIRA_API_BASE_URL);

jiraProjectsRouter.get('/', hasAccessToken, hasRefreshToken, validateAccessToken, async (req: Request, res: Response<ReadMultipleProjects.ControllerResponse | string>) => {
	const readJiraProjectsResult = await jiraApiAxiosInstance.get<ReadMultipleProjects.ApiResponse>(`/rest/api/3/issue/${req.params.id}?fields=summary,description`);

	if (readJiraProjectsResult.status >= 500) {
		return res.status(500).send('Internal server error');
	}

	const mappedResult: ReadMultipleProjects.ControllerResponse = {
		total: readJiraProjectsResult.data.total,
		projects: readJiraProjectsResult.data.values
	};

	return res.send(mappedResult);
});

export default jiraProjectsRouter;
