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
        <h1>Good Afternoon Christopher</h1>
        <CreateEntry />
        <Entries />
      </main>
    );
  }
}

export default App;
