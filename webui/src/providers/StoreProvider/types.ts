import type { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

export type StoreProps = {
	store: ToolkitStore;
  children: React.ReactNode;
};
