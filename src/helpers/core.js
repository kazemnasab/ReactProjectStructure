import * as React from "react";

export const itemUpdated = (prevValue, newValue) => {
  return (items, setItems) => {
    if (!items || !setItems) return;
    if (!newValue && prevValue) {
      //delete item
      var arr = items;
      var index = arr.indexOf(prevValue);
      if (index > -1) {
        arr.splice(index, 1);
      }
      setItems(arr);
    }
    if (!prevValue) setItems([...items, newValue]); // add new item
    // update item
    else
      setItems(items.map((item) => (item.id == newValue.id ? newValue : item)));
  };
};

export const listItemReducer = (state, action)=> {
  console.log(action);

  switch (action.type) {
    case "init":
      return [...action.new];
    case "edit":
      if (action.prev) {
        if (action.new)
          return state.map((item) =>
            item.id == action.prev.id ? action.new : item
          );
        return [...state.filter((m) => m.id != action.prev.id), ...action.new];
      }
      if (action.new) {
        if (action.index == "append") return [...state, ...action.new];
        return [...action.new, ...state];
      }
      return [...state];
    default:
      return [...state];
  }
}

export const useCustomListReducer = ({ initialArg = [], key }) => {
  const [state, dispatch] = React.useReducer(listItemReducer, []);
  React.useEffect(() => {
    if (initialArg) dispatch({ type: "init", new: initialArg });
  }, [key, initialArg]);
  return [state, dispatch];
};
