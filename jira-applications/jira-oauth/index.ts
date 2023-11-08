import 'dotenv/config';
import express, { Application } from 'express';
import passport from 'passport';
import { jiraAuthRouter, jiraIssuesRouter, jiraProjectsRouter, jiraWebhooksRouter } from './controllers';
import bodyParser from 'body-parser';

const app: Application = express();

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use(passport.initialize());
app.use(passport.session());

const port = 8000;

app.use('/api/jira/auth', jiraAuthRouter);
app.use('/api/jira/issues', jiraIssuesRouter);
app.use('/api/jira/projects', jiraProjectsRouter);
app.use('/api/jira/webhooks', jiraWebhooksRouter);

app.listen(port, () => {
	console.log(`Server is Fire at http://localhost:${port}`);
});
