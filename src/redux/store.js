import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import rootReducer from '../redux/root-reduсer';

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
