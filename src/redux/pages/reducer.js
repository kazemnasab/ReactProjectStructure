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
  PAGE_RE_RENDER,
} from "../actions";

const INIT_STATE = [];
/*{
  isOpen: false,
  props: null,
};*/

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PAGE_RE_RENDER:
      return state.map((item) => {
        if (item.page == action.payload.page)
          return {
            ...item,
            ...action.payload,
            reload: item.reload ? item.reload + 1 : 1,
          };
        return item;
      });
    case PAGE_OPEN_DIALOG:
      return [...state, { ...action.payload, type: "dialog" }];
    case PAGE_CLOSE_DIALOG:
      return state.filter(
        (m) => m.page != action.payload.page && m.type == "dialog"
      );
    case PAGE_CLOSE_DIALOG_ALL:
      return state.filter((m) => m.type != "dialog");
    case PAGE_CLOSE_DIALOG_ALL_OTHER:
      return state.filter((m) => m.page == action.payload.page);
    case PAGE_OPEN_TAB:
      return [...state, { ...action.payload, type: "tab", activate: true }];
    case PAGE_CLOSE_TAB:
      return state.filter(
        (m) => m.page != action.payload.page && m.type == "tab"
      ); // { ...state, isOpen: false, ...action.payload };
    case PAGE_ACTIVATE_TAB:
      return state.map((item) => {
        if (item.page != action.payload.page)
          return { ...item, activate: false };
        return { ...item, activate: true };
      });
    // { ...state, isOpen: false, ...action.payload };
    default:
      return [...state];
  }
};
