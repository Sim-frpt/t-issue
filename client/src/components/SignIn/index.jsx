import React from 'react';
import { Container, Box, Typography } from '@material-ui/core';
import SignInForm from './SignInForm';

export default function SignIn() {
  return (
    <>
      <Container>
        <Box
          m={[2, 3, 5]}
          p={3}
          align="center"
          border={2}
          borderTop={0}
          borderRight={0}
          borderLeft={0}
          borderColor="secondary.main"
        > 
          <Typography
            variant="h1"
            color="primary"
            gutterBottom
          >
            Sign In
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
          >
            No account yet? Register
          </Typography>
        </Box>
      </Container>
      <Container maxWidth="xs">
        <SignInForm/>
      </Container>
    </>
  );
}
