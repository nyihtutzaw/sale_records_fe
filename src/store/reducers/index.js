import { combineReducers } from 'redux';

import dialog from './dialog';
import status from './status';
import toDo from './toDo';
import user from './user';

const reducers = combineReducers({
  status,
  dialog,
  toDo,
  user,
});

export default reducers;
