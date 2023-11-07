export namespace ValidateAccessibleResourceId {
	export type ApiResponse = AccessibleResource[];

	export type AccessibleResource = {
		id: string;
		name: string;
		url: string;
	};
}

export type ReqQuery = {
  accessToken: string;
  refresh_token: string;
  accessibleResourceId: string;
}
