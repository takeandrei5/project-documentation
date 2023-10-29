import express, { Request, Response, Router } from 'express';
import { createDefaultAxiosInstance } from '../../../axios';
import { hasAccessToken, hasRefreshToken, validateAccessToken } from '../../../middlewares';
import { ContentEntity, ReadOneJiraIssue, TextContentEntity, UpdateOneJiraIssue } from './types';

const jiraIssuesRouter: Router = express.Router();

const JIRA_API_BASE_URL = 'https://api.atlassian.com/ex/jira/';

const jiraApiAxiosInstance = createDefaultAxiosInstance(JIRA_API_BASE_URL);

jiraIssuesRouter.get(
	'/:id',
	hasAccessToken,
	hasRefreshToken,
	validateAccessToken,
	async (req: Request, res: Response<ReadOneJiraIssue.ControllerResponse | string>) => {
		const readJiraIssueResult = await jiraApiAxiosInstance.get<ReadOneJiraIssue.ApiResponse>(`/rest/api/3/issue/${req.params.id}?fields=summary,description`);

		if (readJiraIssueResult.status === 404) {
			return res.status(404).send('Issue not found');
		}

		if (readJiraIssueResult.status >= 500) {
			return res.status(500).send('Internal server error');
		}

		const mappedResult: ReadOneJiraIssue.ControllerResponse = {
			id: readJiraIssueResult.data.id,
			key: readJiraIssueResult.data.key,
			summary: readJiraIssueResult.data.fields.summary,
			description: readJiraIssueResult.data.fields.description.content
				.map((content: ContentEntity) => content.content.map((content: TextContentEntity) => content.text).join(''))
				.join('')
		};

		return res.send(mappedResult);
	}
);

jiraIssuesRouter.get('/:id', hasAccessToken, hasRefreshToken, validateAccessToken, async (req: Request, res: Response<ReadOneJiraIssue.ControllerResponse | string>) => {
	const readJiraIssueResult = await jiraApiAxiosInstance.get<ReadOneJiraIssue.ApiResponse>(`/rest/api/3/issue/${req.params.id}?fields=summary,description`);

	if (readJiraIssueResult.status === 404) {
		return res.status(404).send('Issue not found');
	}

	if (readJiraIssueResult.status >= 500) {
		return res.status(500).send('Internal server error');
	}

	const mappedResult: ReadOneJiraIssue.ControllerResponse = {
		id: readJiraIssueResult.data.id,
		key: readJiraIssueResult.data.key,
		summary: readJiraIssueResult.data.fields.summary,
		description: readJiraIssueResult.data.fields.description.content
			.map((content: ContentEntity) => content.content.map((content: TextContentEntity) => content.text).join(''))
			.join('')
	};

	return res.send(mappedResult);
});

jiraIssuesRouter.delete('/:id', hasAccessToken, hasRefreshToken, validateAccessToken, async (req: Request, res: Response<null | string>) => {
	const deleteJiraIssueResult = await jiraApiAxiosInstance.delete(`/rest/api/3/issue/${req.params.id}?deleteSubtasks=true`);

	if (deleteJiraIssueResult.status === 404) {
		return res.status(404).send('Issue not found');
	}

	if (deleteJiraIssueResult.status >= 500) {
		return res.status(500).send('Internal server error');
	}

	return res.status(204).send();
});

jiraIssuesRouter.put(
	':id',
	hasAccessToken,
	hasRefreshToken,
	validateAccessToken,
	async (req: Request<{ id: string }, UpdateOneJiraIssue.ControllerRequest>, res: Response<null | string>) => {
		const mappedRequest: UpdateOneJiraIssue.ApiRequest = {
			summary: req.body.summary,
			description: {
				content: [
					req.body.description.split('\n').map((line: string) => ({
						content: [
							{
								text: line,
								type: 'text'
							}
						],
						type: 'paragraph'
					}))
				],
				type: 'doc',
				version: 1
			}
		};

		const updateJiraIssueResult = await jiraApiAxiosInstance.put(`/rest/api/3/issue/${req.params.id}`, mappedRequest);

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
