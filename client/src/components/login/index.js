import React from 'react';

// Styles
import { Container, Box, Typography } from '@material-ui/core';

export default function Login() {
  return (
    <Container>
      <Box
        m={5}
        p={3}
        border={2}
        borderTop={0}
        borderRight={0}
        borderLeft={0}
        borderColor="secondary.main"> 
        <Typography
          variant="h1"
          align="center"
          color="primary"
        >
          Sign In
        </Typography>
      </Box>
    </Container>
  );
}
