import React, { useContext, useEffect } from 'react';
import { signOut } from 'api/SessionApi';
import { AuthContext } from 'AuthContext';
import { Redirect } from 'react-router-dom';

export default function SignOut() {
  const [auth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await signOut();

        setAuth(prevState => {
          return {
            ...prevState,
            authenticated: false,
            user: null,
          }
        });

      } catch(err) {
        console.log(err);
      }
    };

    fetchData();

  });

  return <Redirect to="/" />
}


