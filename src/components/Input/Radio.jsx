import React from 'react';
import { Controller } from 'react-hook-form';
import { Radio as MuiRadio, RadioGroup, FormControlLabel } from '@mui/material';

export function Radio({ name, control, label, options, ...props }){
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <RadioGroup {...field} {...props}>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<MuiRadio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      )}
    />
  );
};

