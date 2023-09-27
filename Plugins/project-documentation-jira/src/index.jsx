import ForgeUI, { Checkbox, CheckboxGroup, Form, Fragment, IssuePanel, render, useProductContext, useState } from '@forge/ui';
import api, { fetch, route } from '@forge/api';

const App = () => {
  const [data] = useState(async () => {
    const google = api.asUser().withProvider('auth0', 'auth0-apis')
    if (!await google.hasCredentials()) {
      await google.requestCredentials()
    }
    const response = await google.fetch('/userinfo');
    if (response.ok) {
      return response.json()
    }
    return {
      status: response.status,
      statusText: response.statusText,
      text: await response.text(),
    }
  })

  console.log(data);
	const {
		platformContext: { issueKey }
	} = useProductContext();

	/**
	 * Description
	 * @param {{
	 *   'summary': boolean,
	 *   'description': boolean,
	 *   'comment': boolean
	 * }} formData
	 * @returns {string}
	 */
	const getIssueFields = (formData) => {
		let issueFields = '';

		for (let formField in formData) {
			if (formData[formField]) {
				issueFields += `${formField},`;
			}
		}

		if (issueFields[issueFields.length - 1] === ',') {
			issueFields = issueFields.slice(0, -1);
		}

		return !!issueFields ? issueFields : 'all';
	};

	/**
	 * Description
	 * @param {{
	 *   'summary': boolean,
	 *   'description': boolean,
	 *   'comment': boolean
	 * }} formData
	 * @returns {Promise<void>}
	 */
	const fetchIssue = async (formData) => {
		const issueFields = getIssueFields(formData);

		const response = await api.asUser().requestJira(route`/rest/api/2/issue/${issueKey}?fields=${issueFields}`);
		const issueData = await response.json();

		const bodyData = {
			summary: issueData.fields.summary,
			description: issueData.fields.description,
			comments: issueData.fields.comment.comments.map((comment) => {
				return {
					body: comment.body,
					authorName: comment.author.displayName,
					authorEmail: comment.author.emailAddress,
					created: comment.created,
					updated: comment.updated
				};
			})
		};

		try {
			// const response = await fetch('https://ptsv3.com/t/hello-123-test-pd/', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'application/json'
			// 	},
			// 	body: JSON.stringify(bodyData)
			// });

			// if (!response.ok) {
			// 	const text = await response.text();
			// 	// TODO: handle error
			// 	console.log(text);
			// }
		} catch (error) {
			// TODO: handle error
			console.log(error);
		}
	};

	return (
		<Fragment>
			<Form
				submitButtonAppearance='primary'
				submitButtonText='Submit'
				onSubmit={async (formData) => {
					await fetchIssue(formData);
				}}>
				<CheckboxGroup name='summary' label="Select which information you'd like to transfer">
					<Checkbox isRequired defaultChecked label='Summary' />
				</CheckboxGroup>
				<CheckboxGroup name='description'>
					<Checkbox label='Description' />
				</CheckboxGroup>
				<CheckboxGroup name='comment'>
					<Checkbox label='Comments' />
				</CheckboxGroup>
			</Form>
		</Fragment>
	);
};

export const run = render(
	<IssuePanel>
		<App />
	</IssuePanel>
);
