import React from 'react';
import { Typography } from '@material-ui/core';

export default function HeroTitle(props) {
  return (
    <Typography
      variant="h1"
      color="primary"
      gutterBottom
    >
      { props.title }
    </Typography>
  );
}
