import express, { Request, Response, Router } from 'express';
import { createDefaultAxiosInstance } from '../../../axios';
import { hasAccessToken, hasRefreshToken, validateAccessToken } from '../../../middlewares';
import { type ReadMultipleWebhooks, type DeleteMultipleWebhooks, type CreateMultipleWebhooks } from './types';

const jiraWebhooksRouter: Router = express.Router();

const JIRA_API_BASE_URL = 'https://api.atlassian.com/ex/jira/';

const jiraApiAxiosInstance = createDefaultAxiosInstance(JIRA_API_BASE_URL);

jiraWebhooksRouter.delete('/', hasAccessToken, hasRefreshToken, validateAccessToken, async (req: Request<{}, {}, DeleteMultipleWebhooks.ControllerRequest>, res: Response) => {
	if (!req.body || !req.body.webhookIds || !req.body.webhookIds) {
		return res.status(400).send('Bad request');
	}

	const mappedRequest: DeleteMultipleWebhooks.ApiRequest = {
		webhookIds: req.body.webhookIds
	};

	const readJiraWebhooksResult = await jiraApiAxiosInstance.delete<DeleteMultipleWebhooks.ApiRequest>(`/rest/api/3/webhook?maxResults=1000`, {
		data: mappedRequest
	});

	if (readJiraWebhooksResult.status >= 500) {
		return res.status(500).send('Internal server error');
	}

	return res.status(204).send();
});

jiraWebhooksRouter.get('/', hasAccessToken, hasRefreshToken, validateAccessToken, async (_: Request, res: Response<ReadMultipleWebhooks.ControllerResponse | string>) => {
	const readJiraWebhooksResult = await jiraApiAxiosInstance.get<ReadMultipleWebhooks.ApiResponse>(`/rest/api/3/webhook?maxResults=1000`);

	if (readJiraWebhooksResult.status >= 500) {
		return res.status(500).send('Internal server error');
	}

	const mappedResult: ReadMultipleWebhooks.ControllerResponse = {
		total: readJiraWebhooksResult.data.total,
		webhooks: readJiraWebhooksResult.data.values
	};

	return res.send(mappedResult);
});

jiraWebhooksRouter.post(
	'/',
	hasAccessToken,
	hasRefreshToken,
	validateAccessToken,
	async (req: Request<{}, {}, CreateMultipleWebhooks.ControllerRequest>, res: Response<CreateMultipleWebhooks.ControllerResponse | string>) => {
		if (!req.body || !req.body.url) {
			return res.status(400).send('Bad request');
		}

		const mappedRequest: CreateMultipleWebhooks.ApiRequest = {
			url: req.body.url,
			webhooks: [
				{
					events: ['jira:issue_created', 'jira:issue_updated', 'jira:issue_deleted']
				}
			]
		};

		const createJiraWebhooksResult = await jiraApiAxiosInstance.post<CreateMultipleWebhooks.ApiResponse>('/rest/api/3/webhook', mappedRequest);

		if (createJiraWebhooksResult.status >= 500) {
			return res.status(500).send('Internal server error');
		}

		const mappedResult: CreateMultipleWebhooks.ControllerResponse = createJiraWebhooksResult.data;

		return res.send(mappedResult);
	}
);

export default jiraWebhooksRouter;
