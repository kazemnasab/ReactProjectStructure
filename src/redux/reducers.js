import { combineReducers } from 'redux';
import donTypes from './dontype/reducer';
import region1 from './region1/reducer';
import routs from './rout/reducer';
import dialogModal from './dialogModal/reducer';
import pages from "./pages/reducer";

const reducers = combineReducers({
  donTypes,
  routs,
  region1,
  dialogModal,
  pages
});

export default reducers;
