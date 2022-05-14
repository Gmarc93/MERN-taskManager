import React from 'react';
import {Grid, TextField} from '@mui/material';

console.log('input.jsx');

export default function Input({
  half,
  type,
  placeholder,
  autoFocus,
  onChangeHandler,
}) {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        size="small"
        required
        fullWidth
        autoFocus={autoFocus}
        type={type}
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
    </Grid>
  );
}
