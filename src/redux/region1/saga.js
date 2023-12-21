import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { REGION1_GET_LIST, REGION1_ADD_ITEM } from "../actions";
import { Region1Api } from "features/repositories";

import {
  getRegion1ListSuccess,
  getRegion1ListError,
  addRegion1ItemSuccess,
  addRegion1ItemError,
} from "./actions";

function* getRegion1ListItems(formData) {
  try {
    console.log(formData.payload);
    const response = yield call(Region1Api.Get(formData.payload));
    yield put(getRegion1ListSuccess(response.data));
  } catch (error) {
    yield put(getRegion1ListError(error));
  }
}

const addRegion1ItemRequest = async (item) => {
  return Region1Api.Post(item).apply;// api_post(`Region1`, item);
};

const editRegion1ItemRequest = async (item) => {
  return Region1Api.Post(item).apply;//api_put(`Region1`, item);
};

function* addRegion1Item({ payload, callback }) {
  try {
    const response = yield call(addRegion1ItemRequest, payload);
    //console.log(response.data);
    yield put(addRegion1ItemSuccess(response.data));
    yield put(callback(response.data));
  } catch (error) {
    yield put(addRegion1ItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(REGION1_GET_LIST, getRegion1ListItems);
}

export function* wathcAddItem() {
  yield takeEvery(REGION1_ADD_ITEM, addRegion1Item);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem)]);
}
