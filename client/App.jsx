import React, { Component } from 'react';

import Entries from './components/Entries.jsx';
import CreateEntry from './components/CreateEntry.jsx';

import './stylesheets/styles.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main>
        <h1>Good Evening Christopher</h1>
        <Entries />
        <CreateEntry />
      </main>
    );
  }
}

export default App;
