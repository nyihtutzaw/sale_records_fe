import { FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import {
  DesktopDatePicker as MuiDatePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { ErrorContaienr } from '../../styles/common';

const DATE_FORMAT = 'YYYY-MM-DD';
export function DatePicker({
  label,
  value,
  control,
  onChange,
  dateFormat = DATE_FORMAT,
  ...otherProps
}) {

  if (control)
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          control={control}
          {...otherProps}
          render={({ field }) => (
            <>
              <DatePickerUI
                {...otherProps}
                // value={field.value}
               // defaultValue={dayjs(new Date())}
                onChange={(date) =>
                  field.onChange(dayjs(new Date(date)).format(dateFormat))
                }
              />
              {otherProps?.error && (
                <ErrorContaienr>
                  <span>{otherProps?.helperText}</span>
                </ErrorContaienr>
              )}
            </>
          )}
        />
      </LocalizationProvider>
    );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePickerUI {...otherProps} onChange={onChange}/>
    </LocalizationProvider>
  );
}

export function DatePickerUI({ onChange, ...otherProps }) {

  return (
    <FormControl fullWidth>
      <MuiDatePicker
        {...otherProps}
        inputFormat="yyyy-MM-dd"
        renderInput={(params) => <TextField {...params} />}
        onChange={(date) => {
          onChange(dayjs(new Date(date)).format(DATE_FORMAT));
          // Add your custom logic here
        }}
      />
    </FormControl>
  );
}
