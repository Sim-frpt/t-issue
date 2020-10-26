import React from 'react';
import { Box, Container, CircularProgress } from '@material-ui/core';

export default function FullPageSpinner() {
  return (
    <Container>
      <Box
        margin="auto"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress
          color="secondary"
          size="4rem"
        />
      </Box>
    </Container>
  );
}
