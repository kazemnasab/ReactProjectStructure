import React from "react";
import Select from "react-select";
const selectStyles = {
  menu: (base) => ({
    ...base,
    zIndex: 100,
  }),
  control: (provided, state) =>
    state.selectProps.value.length === 0
      ? {
          ...provided,
          boxShadow: "0 0 0 .1px red !important",
          borderColor: "red !important",
        }
      : provided,
};

export default function SelectFloatingLabel({ options, defaultValue, value }) {
  return (
    <Select
      textFieldProps={{
        label: "Label",
        InputLabelProps: {
          shrink: true,
        },
      }}
      options={options}
      components={<>Hekk</>}
      value={value}
    />
  );
}
