import React from 'react';
import { useForm } from 'react-hook-form';

export default function signInForm(props) {
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = data => console.log(data);
}
