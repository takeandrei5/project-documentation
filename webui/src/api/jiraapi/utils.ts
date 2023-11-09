const tryAddJiraQueryParams = (url: string) => {
	const accessToken = localStorage.getItem('accessToken');
	const refreshToken = localStorage.getItem('refreshToken');
	const accessibleResourceId = localStorage.getItem('accessibleResourceId');

	if (accessToken && refreshToken && accessibleResourceId) {
		url += `?accessToken=${accessToken}&refreshToken=${refreshToken}&accessibleResourceId=${accessibleResourceId}`;
	} else {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('accessibleResourceId');
	}

	return url;
};
