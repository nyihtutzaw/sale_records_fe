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

export function DatePicker({
  label,
  value,
  control,
  onChange,
  dateFormat = 'YYYY-MM-DD',
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
                value={field.value}
                onChange={(date) =>
                  field.onChange(dayjs(new Date(date)).format(dateFormat))
                }
              />
              {otherProps?.error && <ErrorContaienr>
                <span>{otherProps?.helperText}</span>
              </ErrorContaienr>}
            </>
          )}
        />
      </LocalizationProvider>
    );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePickerUI {...otherProps} />
    </LocalizationProvider>
  );
}

export function DatePickerUI({ ...otherProps }) {
  return (
    <FormControl fullWidth>
      <MuiDatePicker
        {...otherProps}
        inputFormat="yyyy-MM-dd"
        renderInput={(params) => <TextField  {...params}   />}
      />
      </FormControl>
  );
}
