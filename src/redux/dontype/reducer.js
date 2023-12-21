import {
  DON_TYPE_GET_LIST,
  DON_TYPE_GET_LIST_SUCCESS,
  DON_TYPE_GET_LIST_ERROR,
  DON_TYPE_ADD_ITEM,
  DON_TYPE_ADD_ITEM_SUCCESS,
  DON_TYPE_ADD_ITEM_ERROR,
  DON_TYPE_SELECTED_ITEMS_CHANGE,
  DON_TYPE_EDIT,
  DON_TYPE_CANCEL_EDIT
} from '../actions';

const INIT_STATE = {
  loading: false,
  items: [],
  editingItem: null,
  selectedItems: [],
  error: "",
  message: ""
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case DON_TYPE_GET_LIST:
      return { ...state, loading: true };

    case DON_TYPE_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload
      };

    case DON_TYPE_GET_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    case DON_TYPE_ADD_ITEM:
      return { ...state, loading: false, editingItem: null };

    case DON_TYPE_CANCEL_EDIT:
      return { ...state, editingItem: null };

    case DON_TYPE_EDIT:
      return { ...state, editingItem: action.payload };

    case DON_TYPE_ADD_ITEM_SUCCESS:
      if (!state.items.find(m=>m.id == action.payload.id))
        return {
          ...state,
          loading: false,
          items: [...state.items, action.payload],
        };
        return {
          ...state,
          loading: false,
          items: state.items.map((item) => item.id == action.payload.id ? action.payload : {...item})
        };

    case DON_TYPE_ADD_ITEM_ERROR:
      return { ...state, loading: false, error: action.payload };

    case DON_TYPE_SELECTED_ITEMS_CHANGE:
      return { ...state, loading: false, selectedItems: action.payload };
    default:
      return { ...state };
  }
};
