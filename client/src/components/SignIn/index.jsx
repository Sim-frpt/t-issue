import React from 'react';

// Styles
import { Container, Box, Typography, TextField } from '@material-ui/core';

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
      <Container>
        <Box
          mx="auto"
          py={2}
          align="center"
          border={1}
          width="75%"
          boxShadow={1}
        >
          <form>
            <Box
              p={1}
              textAlign="center"
            >
              <TextField
                id="standard-basic"
                label="mail"
                type="text"
              >
              </TextField>
            </Box>

            <Box
              p={1}
            >
              <TextField
                id="standard-basic"
                label="password"
                type="text"
              >
              </TextField>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
}
