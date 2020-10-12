import React, { useContext } from 'react';
import { Container, Box, Typography } from '@material-ui/core';
import SignInForm from './SignInForm';
import { AuthContext } from 'AuthContext';
import { Redirect } from 'react-router-dom';
import HeroTitle from 'components/Common/HeroTitle';

export default function SignIn() {

  const [ auth ] = useContext(AuthContext);

  if (auth.authenticated) {
    return <Redirect to="/"/>;
  }

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
          <HeroTitle
            title="Sign In"
          />
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
