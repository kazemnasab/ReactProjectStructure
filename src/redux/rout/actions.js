// eslint-disable-next-line import/no-cycle
import {
  ROUT_GET_LIST,
  ROUT_GET_LIST_SUCCESS,
  ROUT_GET_LIST_ERROR,
  ROUT_ADD_ITEM,
  ROUT_ADD_ITEM_SUCCESS,
  ROUT_ADD_ITEM_ERROR,
  ROUT_SELECTED_ITEMS_CHANGE,
  ROUT_NEW,
  ROUT_EDIT,
  ROUT_CANCEL_EDIT
} from '../actions';

export const getRoutList = (formData) => ({
  type: ROUT_GET_LIST,
  payload: formData,
});

export const getRoutListSuccess = (items) => ({
  type: ROUT_GET_LIST_SUCCESS,
  payload: items,
});

export const getRoutListError = (error) => ({
  type: ROUT_GET_LIST_ERROR,
  payload: error,
});

export const addRoutItem = (item, callback) => ({
  type: ROUT_ADD_ITEM,
  payload: item,
});

export const cancelEditRout = () => ({
  type: ROUT_CANCEL_EDIT,
});

export const editRout = (item) => ({
  type: ROUT_EDIT,
  payload: item,
});

export const addRoutItemSuccess = (items) => ({
  type: ROUT_ADD_ITEM_SUCCESS,
  payload: items,
});

export const addRoutItemError = (error) => ({
  type: ROUT_ADD_ITEM_ERROR,
  payload: error,
});

export const selectedRoutItemsChange = (selectedItems) => ({
  type: ROUT_SELECTED_ITEMS_CHANGE,
  payload: selectedItems,
});
