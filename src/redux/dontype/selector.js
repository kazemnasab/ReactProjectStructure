import { createSelector } from "reselect";

const selectType = (s, typeId) => typeId;
const selectSearch = (s, ss, search) => search;
const selectItems = (state) => state.donTypes.items;

export const selectItemsSearch = createSelector(
  [selectItems, selectType, selectSearch],
  (items, typeId, search) => {
    return items;
  }
);
