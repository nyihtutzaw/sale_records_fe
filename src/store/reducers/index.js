import { combineReducers } from 'redux';

import dialog from './dialog';
import status from './status';
import toDo from './toDo';
import user from './user';
import customer from './customer';
import product from './product';
import auth from './auth';

const reducers = combineReducers({
  status,
  dialog,
  toDo,
  user,
  customer,
  product,
  auth
});

export default reducers;
