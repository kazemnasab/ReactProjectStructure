import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { ROUT_GET_LIST, ROUT_ADD_ITEM } from "../actions";
import { RoutApi } from "features/repositories";

import {
  getRoutListSuccess,
  getRoutListError,
  addRoutItemSuccess,
  addRoutItemError,
} from "./actions";

function* getRoutListItems(formData) {
  try {
    console.log(formData.payload);
    const response = yield call(RoutApi.Get(formData.payload));
    yield put(getRoutListSuccess(response.data));
  } catch (error) {
    yield put(getRoutListError(error));
  }
}

const addRoutItemRequest = async (item) => {
  return RoutApi.Post(item).apply;// api_post(`Rout`, item);
};

const editRoutItemRequest = async (item) => {
  return RoutApi.Post(item).apply;//api_put(`Rout`, item);
};

function* addRoutItem({ payload, callback }) {
  try {
    const response = yield call(addRoutItemRequest, payload);
    //console.log(response.data);
    yield put(addRoutItemSuccess(response.data));
    yield put(callback(response.data));
  } catch (error) {
    yield put(addRoutItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(ROUT_GET_LIST, getRoutListItems);
}

export function* wathcAddItem() {
  yield takeEvery(ROUT_ADD_ITEM, addRoutItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem)]);
}
