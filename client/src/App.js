import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Login from './components/login';

function App() {
  return (
    <div className="App">
      <Login/>
    </div>
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
