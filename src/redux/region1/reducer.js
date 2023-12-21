import {
  REGION1_GET_LIST,
  REGION1_GET_LIST_SUCCESS,
  REGION1_GET_LIST_ERROR,
  REGION1_ADD_ITEM,
  REGION1_ADD_ITEM_SUCCESS,
  REGION1_ADD_ITEM_ERROR,
  REGION1_SELECTED_ITEMS_CHANGE,
  REGION1_EDIT,
  REGION1_CANCEL_EDIT,
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
    case REGION1_GET_LIST:
      return { ...state, loading: true };

    case REGION1_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };

    case REGION1_GET_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    case REGION1_ADD_ITEM:
      return { ...state, loading: false, editingItem: null };

    case REGION1_CANCEL_EDIT:
      return { ...state, editingItem: null };

    case REGION1_EDIT:
      return { ...state, editingItem: action.payload };

    case REGION1_ADD_ITEM_SUCCESS:
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

    case REGION1_ADD_ITEM_ERROR:
      return { ...state, loading: false, error: action.payload };

    case REGION1_SELECTED_ITEMS_CHANGE:
      return { ...state, loading: false, selectedItems: action.payload };
    default:
      return { ...state };
  }
};
