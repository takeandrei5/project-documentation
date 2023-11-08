import { useEffect, useState } from 'react';

const useVerticalMenu = (nodeId: string) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [moreButtonAnchorEl, setMoreButtonAnchorEl] = useState<HTMLElement | null>(null);

	useEffect(() => {
		setMoreButtonAnchorEl(document.getElementById(`more-button-${nodeId}`));
	}, []);

	const onMenuClosedHandler = (): void => {
		setIsMenuOpen(false);
	};

	const onMoreIconClickedHandler = (): void => {
		setIsMenuOpen(true);
	};

	return { isMenuOpen, moreButtonAnchorEl, onMenuClosedHandler, onMoreIconClickedHandler };
};

export { useVerticalMenu };
