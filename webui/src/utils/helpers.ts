async function copyTextToClipboard(text: string) {
	if ('clipboard' in navigator) {
		return await navigator.clipboard.writeText(text);
	} else {
		return document.execCommand('copy', true, text);
	}
}

function stringFormat(template: string, data: { [key: string]: string }) {
	const pattern = /{\s*(\w+?)\s*}/g; // {property}

	return template.replace(pattern, (_, token) => data[token] || '');
}

export { copyTextToClipboard, stringFormat };
