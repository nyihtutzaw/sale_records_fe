import { combineReducers } from 'redux';

import dialog from './dialog';
import status from './status';
import toDo from './toDo';
import user from './user';
import customer from './customer';
import product from './product';

const reducers = combineReducers({
  status,
  dialog,
  toDo,
  user,
  customer,
  product
});

export default reducers;