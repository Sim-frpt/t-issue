import React, { useContext } from 'react';
import { Container, Box } from '@material-ui/core';
import SignInForm from './SignInForm';
import { AuthContext } from 'AuthContext';
import { Redirect } from 'react-router-dom';
import { HeroTitle, MinorTitle } from 'components/Common/';

export default function SignIn() {

  const [ auth, ] = useContext(AuthContext);

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
          <MinorTitle title="No account yet? Register"/>
        </Box>
      </Container>
      <Container maxWidth="xs">
        <SignInForm/>
      </Container>
    </>
  );
}
