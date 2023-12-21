import { all } from 'redux-saga/effects';
import donType from './dontype/saga';
import rout from './rout/saga';
import region1 from './region1/saga';
import dialogModal from './dialogModal/saga';
import pages from './pages/saga';

export default function* rootSaga() {
  yield all([
    donType(),
    rout(),
    region1(),
    dialogModal(),
    pages(),
  ]);
}
