import React from 'react';
import { TextField } from '@mui/material';

export function Textbox({ registerProps, name, errors, ...otherProp }) {
  return (
    <TextField fullWidth {...registerProps} {...otherProp} />
  );
}
