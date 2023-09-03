import { HotkeysProvider as HotKeysProviderLib } from 'react-hotkeys-hook';
import { HotKeysProps } from './types';
import { FC } from 'react';

const HotkeysProvider:FC<HotKeysProps> = ({ children }) => {
	return (
		<HotKeysProviderLib initiallyActiveScopes={['settings']}>
			{children}
		</HotKeysProviderLib>
	);
};
export default HotkeysProvider;