import { combineReducers} from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './token'
import profileReducer from './profile';
import profileLawyerReducer from './profileLawyer';

export const store = configureStore({
	reducer: combineReducers({
		tokens: tokenReducer,
		profiles: profileReducer,
		profilesLawyer: profileLawyerReducer
	}),
});

export default store
