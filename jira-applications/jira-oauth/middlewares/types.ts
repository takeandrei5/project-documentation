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
  refreshToken: string;
  accessibleResourceId: string;
}
