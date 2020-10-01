import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SignIn from './components/SignIn';
import NavBar from './components/Common/NavBar';
import Spinner  from './components/Common/Spinner';
import { checkAuth } from './api/SessionApi'

function App() {
  const [ user, setUser ] = useState();
  const [ authenticated, setAuthenticated ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect( () => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await checkAuth();

        console.log(result);
        await new Promise(r => setTimeout(r, 4000));
        return result;
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavBar/>
      <div className="App">
        {isLoading ? (
          <Spinner/>
        ): (
          <SignIn/>
        )}
      </div>
    </>
  );
}

const hitHomepage = () => {
  axios.get('http://localhost:3333/')
    .then((response) => {
      console.log(response);
    })
    .catch(err => console.log(err));
}

export default App;
