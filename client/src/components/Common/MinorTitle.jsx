import React from 'react';
import { Box, Typography } from '@material-ui/core';

export default function MinorTitle(props) {
  return (
    <Box mb={1}>
      <Typography
        variant="subtitle1"
        color="textSecondary"
      >
        { props.title }
    </Typography>
    </Box>
  );
}
