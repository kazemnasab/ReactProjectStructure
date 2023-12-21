import { createSelector } from "reselect";

const selectAgent = (s, agentId) => agentId;
const selectSearch = (s, ss, target) => target;
const selectItems = (state) => state.routs.items;

export const selectItemsSearch = createSelector(
  [selectItems, selectAgent, selectSearch],
  (items, agentId, target) => {
    return items.filter(function (item) {
      return (
        (item.agentId == agentId || agentId == 0) &&
        (item.target.toLowerCase() == target.toLowerCase())
      );
    });
  }
);
