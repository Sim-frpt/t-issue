import React, { useState, useEffect, createContext } from 'react';
import { checkAuth } from './api/SessionApi'
import FullPageSpinner from './components/Common/FullPageSpinner';

export const AuthContext = createContext();

export function AuthProvider(props) {
  const [ state, setState ] = useState({
    authenticated: false,
    isLoading: true,
    user: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prevState =>  {
          return {...prevState, isLoading: true};
        });

        const result = await checkAuth();
        result.data.full_name = `${result.data.first_name} ${result.data.last_name}`

        setState(prevState => {
          return {
            ...prevState,
            authenticated: true,
            user: result.data
          };
        });
      } catch (err) {
        setState(prevState =>  {
          return {
            ...prevState,
            authenticated: false,
            user: null
          };
        });
      } finally {
        setState(prevState =>  {
          return {...prevState, isLoading: false};
        });
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {state.isLoading ?
          (<FullPageSpinner/>) : 
          (<AuthContext.Provider value={[state, setState]}>
            {props.children}
          </AuthContext.Provider>
          )
      }
    </>
  );
};
