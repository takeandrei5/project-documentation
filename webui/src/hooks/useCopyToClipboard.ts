const useCopyToClipboard = () => {
	const copyToClipboard = async (
		text: string
	): Promise<{
		status: string;
	}> => {
		await navigator.clipboard.writeText(text);
		return { status: 'success' };
	};

	return { copyToClipboard };
};

export { useCopyToClipboard };
