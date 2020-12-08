import React from 'react';
import { Alert as MuiAlert } from '@material-ui/lab';

export default function Alert({ severity, text }) {
  return (
    <MuiAlert severity={severity}>
      {text}
    </MuiAlert>
  );
}
