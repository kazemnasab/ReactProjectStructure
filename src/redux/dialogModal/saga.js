import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { MODAL_CLOSE, MODAL_OPEN } from '../actions';

import {
  modalOpen,
  modalClose,
} from './actions';

function* modalOpenRequest({ payload }) {
  try {
    const response = yield call(modalOpen, payload);
  } catch (error) {
  }
}

function* modalCloseRequest({ payload }) {
  try {
    const response = yield call(modalClose, payload);
  } catch (error) {
  }
}

export function* watchClose() {
  yield takeEvery(MODAL_CLOSE, modalCloseRequest);
}

export function* watchOpen() {
  yield takeEvery(MODAL_OPEN, modalOpenRequest);
}

export default function* rootSaga() {
  yield all([fork(watchOpen), fork(watchClose)]);
}
