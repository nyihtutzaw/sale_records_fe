import React from 'react';
import { Controller } from 'react-hook-form';
import { MenuItem, Select } from '@mui/material';
import { ErrorContaienr } from '../../styles/common';

export function SelectBox({ name, options, control,value:initValue,onChange:initOnChange, label, ...otherProps }) {
  if (control)
    return (
      <Controller
        name={name}
        id={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <Select
              fullWidth
              labelId={`${name}-label`}
              value={value || ''}
              onChange={(e) => {
                onChange(e.target.value);
              }}
              label={label}
              error={Boolean(otherProps?.error)}
              helperText={otherProps?.helperText}
              {...otherProps}
            >
              {options.map((option) => (
                <MenuItem value={option.value} key={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {otherProps?.error && (
              <ErrorContaienr>
                <span>{otherProps?.helperText}</span>
              </ErrorContaienr>
            )}
          </>
        )}
      />
    );

  return (
    <Select
      fullWidth
      value={initValue || ''}
      onChange={(e) => {
        initOnChange(e.target.value);
      }}
      label={label}
      {...otherProps}
    >
      {options.map((option) => (
        <MenuItem value={option.value} key={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}
