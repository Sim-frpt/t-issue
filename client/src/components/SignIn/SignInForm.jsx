import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box } from '@material-ui/core';

export default function SignInForm() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        variant="outlined"
        margin="normal"
        inputRef={register({minLength: 5})}
        required
        fullWidth
        type="text"
        id="email"
        label="Email Address"
        name="email"
        //error={ errors.email ? true : undefined }
        //helperText={ errors.email ? errors.email : undefined }
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        inputRef={register}
        fullWidth
        id="password"
        label="password"
        type="password"
        name="password"
        //error={ errors.password ? true : undefined }
        //helperText={ errors.password ? errors.password : undefined }
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
  );
}
