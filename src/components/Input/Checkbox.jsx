import React from 'react';
import { Controller } from 'react-hook-form';
import { Checkbox as MuiCheckBox, FormControlLabel } from '@mui/material';

export function Checkbox({ label, onClick, control, ...otherProps }) {
  if (control)
    return (
      <Controller
        control={control}
        {...otherProps}
        render={({ field }) => (
          <FormControlLabel
            control={
              <MuiCheckBox
                {...otherProps}
                onClick={(e) => field.onChange(e.target.checked)}
              />
            }
            label={label || 'Check'}
          />
        )}
      />
    );

  return (
    <FormControlLabel
      control={<MuiCheckBox {...otherProps} onClick={onClick} />}
      label={label || 'Check'}
    />
  );
}
