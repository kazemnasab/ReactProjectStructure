import * as React from 'react';
import * as Api from 'api/core';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

export default function AsyncSelect(props) {
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState({});
const { url, optionsGetter, onChange, value, name, field }=props;
  React.useEffect(() => {
    if (url == '') return;
    setLoading(true);
    Api.api_get(url).then((res) => {
      setOptions(optionsGetter(res.data));
      setLoading(false);
    });
  }, [url]);
  //return (<>{url}</>);
  return (
    <CreatableSelect
      classNamePrefix="react-select"
      isClearabled
      options={options}
      onChange={(val)=>{
        onChange(name, val);
      }}
      onBlur={() => {}}
      value={value}
      {...field}
    />
  );
}
