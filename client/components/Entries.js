import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import EntriesCard from './Entries';

class Entries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedEntries = false,
      entries = [],
    }
  }

  componentDidMount() {
    fetch('/api/')
    .then(res => res.json)
    .then((entries) => {
      if (!Array.isArray(entries)) entries = [];
      return this.setState({
        fetchedEntries = true,
        entries,
      });
    })
    .catch((err) => console.log('Entries.componentDidMount: get entries: ERROR: ', err));
  }

  render() {
    if (!this.state.fetchedEntries) return (
      <div>
        <h1>Loading data, please wait...</h1>
      </div>
    );


        }
}

export default Entries;