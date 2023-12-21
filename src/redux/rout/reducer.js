import {
  ROUT_GET_LIST,
  ROUT_GET_LIST_SUCCESS,
  ROUT_GET_LIST_ERROR,
  ROUT_ADD_ITEM,
  ROUT_ADD_ITEM_SUCCESS,
  ROUT_ADD_ITEM_ERROR,
  ROUT_SELECTED_ITEMS_CHANGE,
  ROUT_EDIT,
  ROUT_CANCEL_EDIT,
} from "../actions";

const INIT_STATE = {
  loading: false,
  items: [],
  editingItem: null,
  selectedItems: [],
  error: "",
  message: "",
};

export default (state = INIT_STATE, action) => {
  //console.log(action);
  switch (action.type) {
    case ROUT_GET_LIST:
      return { ...state, loading: true };

    case ROUT_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };

    case ROUT_GET_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    case ROUT_ADD_ITEM:
      return { ...state, loading: false, editingItem: null };

    case ROUT_CANCEL_EDIT:
      return { ...state, editingItem: null };

    case ROUT_EDIT:
      return { ...state, editingItem: action.payload };

    case ROUT_ADD_ITEM_SUCCESS:
      if (!state.items.find((m) => m.id == action.payload.id))
        return {
          ...state,
          loading: false,
          items: [...state.items, action.payload],
        };
      return {
        ...state,
        loading: false,
        items: state.items.map((item) =>
          item.id == action.payload.id ? action.payload : { ...item }
        ),
      };

    case ROUT_ADD_ITEM_ERROR:
      return { ...state, loading: false, error: action.payload };

    case ROUT_SELECTED_ITEMS_CHANGE:
      return { ...state, loading: false, selectedItems: action.payload };
    default:
      return { ...state };
  }
};
