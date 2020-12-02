import React from 'react';
import { Typography } from '@material-ui/core';

export default function MinorTitle(props) {
  return (
    <Typography
      variant="subtitle1"
      color="textSecondary"
    >
      { props.title }
    </Typography>
  );
}
