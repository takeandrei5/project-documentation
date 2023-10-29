import express, { Application } from 'express';
import passport from 'passport';
import { jiraAuthRouter, jiraIssuesRouter } from './controllers';

const app: Application = express();

app.use(passport.initialize());
app.use(passport.session());

const port = 8000;

app.use('/api/jira/auth', jiraAuthRouter);
app.use('/api/jira/issues', jiraIssuesRouter);

app.listen(port, () => {
	console.log(`Server is Fire at http://localhost:${port}`);
});
