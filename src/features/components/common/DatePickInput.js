import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AdapterJalali from "@date-io/date-fns-jalali";
import moment from "jalali-moment";

export default function DatePickInput({ value, onChange }) {

  return (
    <LocalizationProvider dateAdapter={AdapterJalali}>
      <DatePicker
      
        className="form-control"
        value={value}
        onChange={(newValue) => {
          onChange(newValue);
        }}
        renderInput={(params) => <TextField  {...params} />}
      />
    </LocalizationProvider>
  );
}