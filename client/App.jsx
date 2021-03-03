import React, { Component } from 'react';

import Entries from './components/Entries.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main>
        <h1>Hello World</h1>
        <Entries />
      </main>
    );
  }
}

export default App;
