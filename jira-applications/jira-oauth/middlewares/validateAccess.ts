import { NextFunction, Request, Response } from 'express';
import { createDefaultAxiosInstance } from '../axios';
import { ReqQuery, ValidateAccessibleResourceId } from './types';

const JIRA_URL = 'https://api.atlassian.com/oauth/token/accessible-resources';

const jiraAccessibleResourcesInstance = createDefaultAxiosInstance(JIRA_URL);

const validateAccess = async (req: Request<{}, {}, {}, Partial<ReqQuery>>, res: Response, next: NextFunction) => {
  const readAccessibleResourcesResult = await jiraAccessibleResourcesInstance.get<ValidateAccessibleResourceId.ApiResponse>('', {
    headers: {
      Authorization: req.headers.authorization
    }
  });

  console.log(readAccessibleResourcesResult.data)
	if (readAccessibleResourcesResult.status >= 500) {
		return res.status(500).send('Internal server error');
	}

  if (readAccessibleResourcesResult.status >= 400) {
		return res.status(401).send('Invalid access token or refresh token');
	}

	const isAccessibleResourcesIdValid = readAccessibleResourcesResult.data.some(
		(resource: ValidateAccessibleResourceId.AccessibleResource) => resource.id === req.query.accessibleResourceId
	);

	if (!isAccessibleResourcesIdValid) {
		return res.status(401).send('Invalid accessible resource id');
	}

	next();
};

export default validateAccess;
