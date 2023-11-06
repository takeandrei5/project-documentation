export namespace ValidateAccessibleResourceId {
	export type ApiResponse = AccessibleResource[];

	export type AccessibleResource = {
		id: string;
		name: string;
		url: string;
	};
}

export type ReqQuery = {
  refresh_token: string;
  accessibleResourceId: string;
}
