export { ActionTypes } from 'redux-signin';
export { Selectors } from 'redux-signin';
export { Reducers } from 'redux-signin';

import { MakeActions } from 'redux-signin';
export const Actions = MakeActions({
	getItem: window.localStorage.getItem.bind(window.localStorage), 
	setItem: window.localStorage.setItem.bind(window.localStorage), 
	removeItem: window.localStorage.removeItem.bind(window.localStorage)
});