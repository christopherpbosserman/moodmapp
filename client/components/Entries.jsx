import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import EntryCard from './EntryCard.jsx';
import DetailsModal from './DetailsModal.jsx';

class Entries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedEntries: false,
      entries: [],
      modalState: {
        open: false,
        type: null,
        position: { top: 0, left: 0 },
        id: null,
      },
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  openModal(type, position, id) {
    this.setState({
      modalState: {
        ...this.state.modalState,
        open: true,
        type,
        position,
        id,
      },
    });
  }

  closeModal() {
    this.setState({
      modalState: {
        ...this.state.modalState,
        open: false,
      },
    });
  }
  render() {
    if (!this.state.fetchedEntries)
      return (
        <div>
          <h3>Loading data, please wait...</h3>
        </div>
      );

    const { entries } = this.state;

    if (!entries) return null;

    if (!entries.length) return <div>Sorry, no entries found</div>;

    const entryElems = entries.map((entry, i) => {
      return <EntryCard key={i} info={entry} openModal={this.openModal} />;
    });

    return (
      <section className="mainSection">
        <div className="entryContainer">{entryElems}</div>
        {this.state.modalState.open && (
          <DetailsModal
            type={this.state.modalState.type}
            position={this.state.modalState.position}
            id={this.state.modalState.id}
            closeModal={this.closeModal}
          />
        )}
      </section>
    );
  }
}

export default Entries;
