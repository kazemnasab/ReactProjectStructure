import { createSelector } from "reselect";

const selectSearch = (s, search) => search;
const selectItems = (state) => state.region1.items;

export const selectItemsSearch = createSelector(
  [selectItems, selectSearch],
  (items, search) => {
    return items;
  }
);
