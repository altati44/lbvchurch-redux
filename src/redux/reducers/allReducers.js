import reducer from './reducer';
import notifier from './notifier'

import { combineReducers } from 'redux';

export default combineReducers({
    reducer, notifier
})