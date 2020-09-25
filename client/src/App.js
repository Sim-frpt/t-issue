import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <button onClick={hitHomepage}>Send request</button>
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
