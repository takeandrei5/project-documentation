import { AccessibleResourceId } from '../types';

export namespace ReadMultipleWebhooks {
	export type ControllerResponse = {
		webhooks: Webhook[];
		total: number;
	};

  export type ControllerRequest = AccessibleResourceId;

	export type Webhook = {
		id: number;
		events: string[];
		expirationDate: Date;
	};

	export type ApiResponse = {
		total: number;
		values: Webhook[];
	};
}

export namespace DeleteMultipleWebhooks {
	export type ControllerRequest = AccessibleResourceId & {
		webhookIds: number[];
	};

	export type ApiRequest = {
		webhookIds: number[];
	};
}

export namespace CreateMultipleWebhooks {
	export type ControllerRequest = AccessibleResourceId & {
		url: string;
	};

	export type ControllerResponse = ApiResponse;

	export type ApiResponse = {
		webhookRegistrationResult: (CreatedWebhookId | Error)[];
	};

	export type CreatedWebhookId = {
		createdWebhookId: number;
	};

	export type Error = {
		errors: string[];
	};

	export type Webhook = {
		events: string[];
	};

	export type ApiRequest = {
		url: string;
		webhooks: Webhook[];
	};
}
