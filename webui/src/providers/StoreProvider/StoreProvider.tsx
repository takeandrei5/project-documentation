import type { StoreProps } from './types';
import { Provider } from 'react-redux';

const StoreProvider: React.FC<StoreProps> = ({ store, children }) => {
	return <Provider store={store}>{children}</Provider>;
};
export default StoreProvider;
