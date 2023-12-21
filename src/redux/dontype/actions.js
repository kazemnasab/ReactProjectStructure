// eslint-disable-next-line import/no-cycle
import {
  DON_TYPE_GET_LIST,
  DON_TYPE_GET_LIST_SUCCESS,
  DON_TYPE_GET_LIST_ERROR,
  DON_TYPE_ADD_ITEM,
  DON_TYPE_ADD_ITEM_SUCCESS,
  DON_TYPE_ADD_ITEM_ERROR,
  DON_TYPE_SELECTED_ITEMS_CHANGE,
  DON_TYPE_NEW,
  DON_TYPE_EDIT,
  DON_TYPE_CANCEL_EDIT
} from '../actions';

export const getDonTypeList = () => ({
  type: DON_TYPE_GET_LIST,
});

export const getDonTypeListSuccess = (items) => ({
  type: DON_TYPE_GET_LIST_SUCCESS,
  payload: items,
});

export const getDonTypeListError = (error) => ({
  type: DON_TYPE_GET_LIST_ERROR,
  payload: error,
});

export const addDonTypeItem = (item) => ({
  type: DON_TYPE_ADD_ITEM,
  payload: item,
});

export const cancelEditDonType = () => ({
  type: DON_TYPE_CANCEL_EDIT,
});

export const editDonType = (item) => ({
  type: DON_TYPE_EDIT,
  payload: item,
});

export const addDonTypeItemSuccess = (items) => ({
  type: DON_TYPE_ADD_ITEM_SUCCESS,
  payload: items,
});

export const addDonTypeItemError = (error) => ({
  type: DON_TYPE_ADD_ITEM_ERROR,
  payload: error,
});

export const selectedDonTypeItemsChange = (selectedItems) => ({
  type: DON_TYPE_SELECTED_ITEMS_CHANGE,
  payload: selectedItems,
});
