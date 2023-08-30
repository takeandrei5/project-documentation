import { StoreProps } from './types';
import { FC } from 'react';
import { Provider } from 'react-redux';

const StoreProvider:FC<StoreProps> = ({ store, children }) => {
	return <Provider store={store}>{children}</Provider>;
};
export default StoreProvider;