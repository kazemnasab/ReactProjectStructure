import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  PAGE_OPEN_DIALOG,
  PAGE_CLOSE_DIALOG,
  PAGE_CLOSE_DIALOG_ALL,
} from "../actions";

import {
  pageOpenDialog,
  pageCloseDialog,
  pageCloseDialogAll,
  pageCloseDialogAllOther,
  pageReRender
} from "./actions";

function* pageOpenDialogRequest({ payload }) {
  try {
    const response = yield call(pageOpenDialog, payload);
  } catch (error) {}
}

function* pageReRenderRequest({ payload }) {
  try {
    const response = yield call(pageReRender, payload);
  } catch (error) {}
}


function* pageCloseDialogRequest({ payload }) {
  try {
    const response = yield call(pageCloseDialog, payload);
  } catch (error) {}
}

function* pageCloseDialogAllRequest() {
  try {
    const response = yield call(pageCloseDialogAll);
  } catch (error) {}
}

export function* watchClose() {
  yield takeEvery(PAGE_CLOSE_DIALOG, pageCloseDialogRequest);
}

export function* watchCloseAll() {
  yield takeEvery(PAGE_CLOSE_DIALOG_ALL, pageCloseDialogAllRequest);
}

export function* watchOpen() {
  yield takeEvery(PAGE_OPEN_DIALOG, pageOpenDialogRequest);
}

export default function* rootSaga() {
  yield all([fork(watchOpen), fork(watchClose)]);
}
