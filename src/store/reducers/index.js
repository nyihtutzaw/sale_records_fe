import { combineReducers } from 'redux';

import dialog from './dialog';
import status from './status';
import toDo from './toDo';
import user from './user';
import customer from './customer';
import product from './product';
import auth from './auth';
import saleRecord from './saleRecord';
import saleRecordDetail from './saleRecordDetail';

const reducers = combineReducers({
  status,
  dialog,
  toDo,
  user,
  customer,
  product,
  auth,
  saleRecord,
  saleRecordDetail
});

export default reducers;
