import React from 'react'
import Guide from './guide'

import { BrowserRouter as Router } from 'react-router-dom'

import './App.css'

function App({ client, ...props }) {
  document.title = 'NTU Food Bank'
  
  return (
    <Router>
      <Guide client={client} />
    </Router>
  );
}

export default App;
