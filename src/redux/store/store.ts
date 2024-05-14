import { combineReducers, configureStore } from '@reduxjs/toolkit';

import ticketsReducer from './reducers/ticketsSlice';

import { ticketsApi } from '../../services/TicketsService';

const rootReducer = combineReducers({
    ticketsReducer, 
    [ticketsApi.reducerPath]: ticketsApi.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ticketsApi.middleware),
    })
};

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']