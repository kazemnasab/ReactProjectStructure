import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

export default function AsyncCell({ url , loadData, valueGetter }) {

  const [loading, setLoading] = React.useState(true);
  const [value, setValue] = React.useState("-");

  React.useEffect(() => {
    if (loading) {
      loadData().then((res) => {
        setLoading(false);
        setValue(valueGetter(res.data));
      });
    }
  }, []);

  return (
    <>{loading ? <Box sx={{ width: '100%' }}><LinearProgress /></Box> : <>{value}</>}</>
  );
}