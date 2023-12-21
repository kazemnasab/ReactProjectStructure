import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {api_get, api_post,api_put} from 'providers/http/axios'
import { DON_TYPE_GET_LIST, DON_TYPE_ADD_ITEM } from '../actions';

import {
  getDonTypeListSuccess,
  getDonTypeListError,
  addDonTypeItemSuccess,
  addDonTypeItemError,
} from './actions';

const getDonTypeListRequest = async () => {
  return api_get(`DonType?store=SaleService`);
};

function* getDonTypeListItems() {
  try {
    const response = yield call(getDonTypeListRequest);
    yield put(getDonTypeListSuccess(response.data));
  } catch (error) {
    yield put(getDonTypeListError(error));
  }
}

const addDonTypeItemRequest = async (item) => {
  return api_post(`DonType`, item);
};

const editDonTypeItemRequest = async (item) => {
  return api_put(`DonType`, item);
};

function* addDonTypeItem({ payload }) {
  try {
    const response = yield call(addDonTypeItemRequest, payload);
    //console.log(response);
    yield put(addDonTypeItemSuccess(response.data));
  } catch (error) {
    yield put(addDonTypeItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(DON_TYPE_GET_LIST, getDonTypeListItems);
}

export function* wathcAddItem() {
  yield takeEvery(DON_TYPE_ADD_ITEM, addDonTypeItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem)]);
}
