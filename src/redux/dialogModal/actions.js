// eslint-disable-next-line import/no-cycle
import {
  MODAL_OPEN,
  MODAL_CLOSE,
} from '../actions';


export const modalOpen = (payload) => ({
  type: MODAL_OPEN,
  payload: payload,
});


export const modalClose = (payload) => ({
  type: MODAL_CLOSE,
  payload: payload,
});



