import express, { Request, Response, Router } from 'express';
import { createDefaultAxiosInstance } from '../../../axios';
import { hasAccessToken, hasRefreshToken, validateAccess, validateAccessAndRefreshTokens } from '../../../middlewares';
import { ReqQuery } from '../../../middlewares/types';
import { ContentEntity, CreateOneJiraIssue, ReadOneJiraIssue, TextContentEntity, UpdateOneJiraIssue } from './types';

const jiraIssuesRouter: Router = express.Router();

const JIRA_API_BASE_URL = 'https://api.atlassian.com/ex/jira/';

const jiraApiAxiosInstance = createDefaultAxiosInstance(JIRA_API_BASE_URL);

jiraIssuesRouter.delete(
	'/:id',
	hasAccessToken,
	hasRefreshToken,
	validateAccessAndRefreshTokens,
	validateAccess,
	async (req: Request<{ id: string }, {}, {}, ReqQuery>, res: Response<null | string>) => {
		const deleteJiraIssueResult = await jiraApiAxiosInstance.delete(`${req.query.accessibleResourceId}/rest/api/3/issue/${req.params.id}?deleteSubtasks=true`, {
			headers: {
				Authorization: `Bearer ${req.query.accessToken}`
			}
		});

		if (deleteJiraIssueResult.status === 404) {
			return res.status(404).send('Issue not found');
		}

		if (deleteJiraIssueResult.status >= 500) {
			return res.status(500).send('Internal server error');
		}

		return res.status(204).send();
	}
);

jiraIssuesRouter.get(
	'/:id',
	hasAccessToken,
	hasRefreshToken,
	validateAccessAndRefreshTokens,
	validateAccess,
	async (req: Request<{ id: string }, {}, {}, ReqQuery>, res: Response<ReadOneJiraIssue.ControllerResponse | string>) => {
		const readJiraIssueResult = await jiraApiAxiosInstance.get<ReadOneJiraIssue.ApiResponse>(
			`${req.query.accessibleResourceId}/rest/api/3/issue/${req.params.id}?fields=summary,description`,
			{
				headers: {
					Authorization: `Bearer ${req.query.accessToken}`
				}
			}
		);

		if (readJiraIssueResult.status === 404) {
			return res.status(404).send('Issue not found');
		}

		if (readJiraIssueResult.status >= 500) {
			return res.status(500).send('Internal server error');
		}

		const mappedResult: ReadOneJiraIssue.ControllerResponse = {
			issue: {
				id: readJiraIssueResult.data.id,
				key: readJiraIssueResult.data.key,
				summary: readJiraIssueResult.data.fields.summary,
				description: readJiraIssueResult.data.fields.description.content
					.map((content: ContentEntity) => content.content.map((content: TextContentEntity) => content.text).join(''))
					.join('')
			}
		};

		return res.send(mappedResult);
	}
);

jiraIssuesRouter.post(
	'/',
	hasAccessToken,
	hasRefreshToken,
	validateAccessAndRefreshTokens,
	validateAccess,
	async (req: Request<{}, {}, CreateOneJiraIssue.ControllerRequest, ReqQuery>, res: Response<CreateOneJiraIssue.ControllerResponse | string>) => {
		if (!req.body || !req.body.projectId || !req.body.summary) {
			return res.status(400).send('Missing required fields');
		}

		const mappedRequest: CreateOneJiraIssue.ApiRequest = {
			fields: {
				summary: req.body.summary,
				description: {
					content: req.body.description.split('\n').map((line: string) => ({
						content: [
							{
								text: line,
								type: 'text'
							}
						],
						type: 'paragraph'
					})),

					type: 'doc',
					version: 1
				},
				issuetype: {
					id: '10001' // Task
				},
				project: {
					id: req.body.projectId
				}
			}
		};

		const createIssueResult = await jiraApiAxiosInstance.post(`${req.query.accessibleResourceId}/rest/api/3/issue`, mappedRequest, {
			headers: {
				Authorization: `Bearer ${req.query.accessToken}`
			}
		});

		if (createIssueResult.status >= 500) {
			return res.status(500).send('Internal server error');
		}

		return res.status(200).send({
			id: createIssueResult.data.id
		});
	}
);

jiraIssuesRouter.put(
	'/:id',
	hasAccessToken,
	hasRefreshToken,
	validateAccessAndRefreshTokens,
	validateAccess,
	async (req: Request<{ id: string }, {}, UpdateOneJiraIssue.ControllerRequest, ReqQuery>, res: Response<null | string>) => {
		if (!req.body || !req.body.summary || !req.body.description) {
			return res.status(400).send('Missing required fields');
		}

		const mappedRequest: UpdateOneJiraIssue.ApiRequest = {
			fields: {
				summary: req.body.summary,
				description: {
					content: req.body.description.split('\n').map((line: string) => ({
						content: [
							{
								text: line,
								type: 'text'
							}
						],
						type: 'paragraph'
					})),
					type: 'doc',
					version: 1
				}
			}
		};

		const updateJiraIssueResult = await jiraApiAxiosInstance.put(`${req.query.accessibleResourceId}/rest/api/3/issue/${req.params.id}`, mappedRequest, {
			headers: {
				Authorization: `Bearer ${req.query.accessToken}`
			}
		});

		if (updateJiraIssueResult.status === 400) {
			return res.status(400).send('Missing required fields');
		}

		if (updateJiraIssueResult.status === 404) {
			return res.status(404).send('Issue not found');
		}

		if (updateJiraIssueResult.status >= 500) {
			return res.status(500).send('Internal server error');
		}

		return res.status(204).send();
	}
);

export default jiraIssuesRouter;
