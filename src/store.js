import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import seminarHallReducer from './Slices/Slice';

const persistConfig = {
    key: 'seminarHallPersist',
    storage,
  };
const persistedSeminarHallReducer = persistReducer(persistConfig, seminarHallReducer);

export const store = configureStore({
    reducer: {
        seminarHall: persistedSeminarHallReducer,
    },
    // The below middleware is used To remove serializable check on functions listed in array below.
  // This serializable check is the routine of persist library. if check not ignored then it will show warnings.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);