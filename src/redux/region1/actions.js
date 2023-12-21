// eslint-disable-next-line import/no-cycle
import {
  REGION1_GET_LIST,
  REGION1_GET_LIST_SUCCESS,
  REGION1_GET_LIST_ERROR,
  REGION1_ADD_ITEM,
  REGION1_ADD_ITEM_SUCCESS,
  REGION1_ADD_ITEM_ERROR,
  REGION1_SELECTED_ITEMS_CHANGE,
  REGION1_NEW,
  REGION1_EDIT,
  REGION1_CANCEL_EDIT
} from '../actions';

export const getRegion1List = (formData) => ({
  type: REGION1_GET_LIST,
  payload: formData,
});

export const getRegion1ListSuccess = (items) => ({
  type: REGION1_GET_LIST_SUCCESS,
  payload: items,
});

export const getRegion1ListError = (error) => ({
  type: REGION1_GET_LIST_ERROR,
  payload: error,
});

export const addRegion1Item = (item, callback) => ({
  type: REGION1_ADD_ITEM,
  payload: item,
});

export const cancelEditRegion1 = () => ({
  type: REGION1_CANCEL_EDIT,
});

export const editRegion1 = (item) => ({
  type: REGION1_EDIT,
  payload: item,
});

export const addRegion1ItemSuccess = (items) => ({
  type: REGION1_ADD_ITEM_SUCCESS,
  payload: items,
});

export const addRegion1ItemError = (error) => ({
  type: REGION1_ADD_ITEM_ERROR,
  payload: error,
});

export const selectedRegion1ItemsChange = (selectedItems) => ({
  type: REGION1_SELECTED_ITEMS_CHANGE,
  payload: selectedItems,
});
