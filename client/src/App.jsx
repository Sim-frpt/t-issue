import React from 'react';
import axios from 'axios';
import SignIn from './components/SignIn';
import NavBar from './components/Common/NavBar';

function App() {
  return (
    <>
      <NavBar/>
      <div className="App">
        <SignIn/>
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
