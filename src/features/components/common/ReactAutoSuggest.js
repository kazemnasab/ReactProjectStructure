import React, { useEffect, useState } from 'react';
import Autosuggest from 'react-autosuggest';

const getSuggestionValue = (suggestion) => suggestion.name;

const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

const ReactAutoSuggest = ({ data, value, defaultValue, placeholder, onChange }) => {
  const [valueState, setValueState] = useState(value);
  const [dataState] = useState(data || []);
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = (val) => {
    if (val) {
      const inputValue = val.trim().toLowerCase();
      const inputLength = inputValue.length;

      return inputLength === 0
        ? []
        : dataState.filter(
          (d) => d.name.toLowerCase().includes(inputValue)
        );
    }
    return dataState;
  };

  const changeInput = (event, { newValue }) => {
    setValueState(newValue);
    const selected_value = dataState.find(m => m.name == newValue);
    if (selected_value != null || selected_value != undefined)
      onChange(selected_value.item);
    else
      onChange({ ...defaultValue, name: newValue });
  };

  const onSuggestionsFetchRequested = ({ value: val }) => {

    setSuggestions(getSuggestions(val));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: placeholder || '',
    value: valueState,
    onChange: changeInput,
  };

  useEffect(() => {
  });
  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      value={value}
      defaultValue={defaultValue}
      inputProps={inputProps}
      theme={{
        container: 'autosuggest',
        input: 'form-control',
        inputOpen: 'react-autosuggest__input--open',
        suggestionsContainer: 'react-autosuggest__suggestions-container',
        suggestionsContainerOpen:
          'react-autosuggest__suggestions-container--open',
        suggestionsList: `react-autosuggest__suggestions-list ${suggestions.length ? 'show' : ''
          }`,
        suggestionFocused: 'active',
        suggestion: 'react-autosuggest__suggestion',
      }}
    />
  );
};

export default ReactAutoSuggest;
