import React from 'react';
import { Box, Container, CircularProgress } from '@material-ui/core';

export default function Spinner() {
  return (
    <Container maxWidth="md">
      <Box
        margin="auto"
        minHeight="25vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress color="secondary"/>
      </Box>
    </Container>
  );
}
