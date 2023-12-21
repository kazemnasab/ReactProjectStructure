import { MODAL_CLOSE, MODAL_OPEN } from "../actions";

const INIT_STATE = {
  isOpen: false,
  props: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case MODAL_OPEN:
      return { ...state, isOpen: true, ...action.payload };
    case MODAL_CLOSE:
      return { ...state, isOpen: false, ...action.payload };
    default:
      return { ...state };
  }
};
