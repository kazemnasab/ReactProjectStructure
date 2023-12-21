// eslint-disable-next-line import/no-cycle
import {
  PAGE_OPEN_DIALOG,
  PAGE_CLOSE_DIALOG,
  PAGE_CLOSE_DIALOG_ALL,
  PAGE_CLOSE_DIALOG_ALL_OTHER,
  PAGE_CLOSE_TAB,
  PAGE_OPEN_TAB,
  PAGE_ACTIVATE_TAB,
  PAGE_CLOSE_TAB_ALL,
  PAGE_CLOSE_TAB_ALL_OTHER,
  PAGE_RE_RENDER
} from '../actions';


export const pageReRender = (payload) => ({
  type: PAGE_RE_RENDER,
  payload: payload,
});

export const pageOpenDialog = (payload) => ({
  type: PAGE_OPEN_DIALOG,
  payload: payload,
});


export const pageCloseDialog = (payload) => ({
  type: PAGE_CLOSE_DIALOG,
  payload: payload,
});

export const pageCloseDialogAll = () => ({
  type: PAGE_CLOSE_DIALOG_ALL,
});

export const pageCloseDialogAllOther = (payload) => ({
  type: PAGE_CLOSE_DIALOG_ALL_OTHER,
  payload: payload,
});


export const pageCloseTab = (payload) => ({
  type: PAGE_OPEN_TAB,
  payload: payload,
});


export const pageCloseClose = (payload) => ({
  type: PAGE_CLOSE_TAB,
  payload: payload,
});

export const pageCloseCloseAll = (payload) => ({
  type: PAGE_CLOSE_TAB_ALL,
  payload: payload,
});


export const pageCloseCloseAllOther = (payload) => ({
  type: PAGE_CLOSE_TAB_ALL_OTHER,
  payload: payload,
});

export const pageActivateTab = (payload) => ({
  type: PAGE_ACTIVATE_TAB,
  payload: payload,
});


