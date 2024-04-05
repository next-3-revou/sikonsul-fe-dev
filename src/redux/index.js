import { combineReducers} from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './token'
import profileReducer from './profile';

export const store = configureStore({
	reducer: combineReducers({
		tokens: tokenReducer,
		profiles: profileReducer
	}),
});

export default store
