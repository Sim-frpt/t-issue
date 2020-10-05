import React, { useState, useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography} from '@material-ui/core';
import { signIn } from 'api/SessionApi';
import { AuthContext } from 'AuthContext';

export default function SignInForm() {
  const { register, handleSubmit, errors, reset } = useForm();
  const [ error, setError ] = useState(null);
  const [, setAuth ] = useContext(AuthContext);
  const emailRef = useRef();

  const onSubmit = async data => {
    try {
      await signIn(data)
        .then((result) => {
          setAuth(prevState => {
            return {
              ...prevState,
              authenticated: true,
              user: result.data
            };
          })

          reset();
        });
    } catch (err) {
      setError(err.response.data.error.message);
      reset({'email': data.email});
      emailRef.current.focus();
    }
  }

  return (
    <>
      {error
        ? <Typography variant="subtitle1" color="error" >{error}</Typography>
        : ''
      }
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={(e) => {
            register(e, { required: true });
            emailRef.current = e
          }}
          fullWidth
          type="text"
          id="email"
          label="Email Address"
          name="email"
          error={ errors.email ? true : undefined }
          helperText={ errors.email ? errors.email.message : undefined }
        />
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register({ required: true })}
          fullWidth
          id="password"
          label="password"
          type="password"
          name="password"
          error={ errors.password ? true : undefined }
          helperText={ errors.password ? errors.password.message : undefined }
        />
        <Box mt={2}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            color="primary"
          >
            Sign In
          </Button>
        </Box>
      </form>
    </>
  );
}
