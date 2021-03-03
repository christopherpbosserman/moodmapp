import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import EntryCard from './EntryCard.jsx';

class Entries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedEntries: false,
      entries: [],
    };
  }

  componentDidMount() {
    fetch('/api/')
      .then((res) => res.json())
      .then((entries) => {
        if (!Array.isArray(entries)) entries = [];
        return this.setState({
          fetchedEntries: true,
          entries,
        });
      })
      .catch((err) =>
        console.log('Entries.componentDidMount: get entries: ERROR: ', err)
      );
  }

  render() {
    if (!this.state.fetchedEntries)
      return (
        <div>
          <h1>Loading data, please wait...</h1>
        </div>
      );

    const { entries } = this.state;

    if (!entries) return null;

    if (!entries.length) return <div>Sorry, no entries found</div>;

    const entryElems = entries.map((entry, i) => {
      return <EntryCard key={i} info={entry} />;
    });

    return (
      <section className="mainSection">
        <header className="pageHeader">
          <h2>Entries</h2>
          {/* <Link to={'/create'}>
            <button type="button" className="btnSecondary">
              Create Character
            </button>
          </Link> */}
        </header>
        <div className="entryContainer">{entryElems}</div>
        {/* {this.state.modalState.open && (
          <DetailsModal
            type={this.state.modalState.type}
            position={this.state.modalState.position}
            id={this.state.modalState.id}
            closeModal={this.closeModal}
          />
        )} */}
      </section>
    );
  }
}

export default Entries;
