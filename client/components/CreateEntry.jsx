import React from 'react';

class CreateEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toLocaleString('en-US').split(',')[0],
      mood: '3',
      desc: 'OK',
      note: 'Leave a note?',
      clear: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    switch (target.value) {
      case '1':
        this.setState({ desc: 'Bad' });
        break;
      case '2':
        this.setState({ desc: 'Not Good' });
        break;
      case '3':
        this.setState({ desc: 'OK' });
        break;
      case '4':
        this.setState({ desc: 'Good' });
        break;
      case '5':
        this.setState({ desc: 'Great' });
        break;
      default:
        break;
    }

    this.setState({ [name]: target.value });
  }

  handleSubmit(event) {
    fetch('/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(() => {
        history.push('/');
      })
      .catch((err) => console.log('CreateEntry fect /api/: ERROR: ', err));

    this.setState({ mood: '3' });
  }

  clearForm() {
    if (!this.state.clear) {
      this.setState({ note: '', clear: true });
    }
  }

  componentDidMount() {}

  render() {
    console.log(this.state.date);

    return (
      <form
        className={`createEntry mood${this.state.mood}`}
        onSubmit={this.handleSubmit}
      >
        <div>
          <input
            className={`moodSlider mood${this.state.mood}`}
            name="mood"
            type="range"
            min="1"
            max="5"
            value={this.state.mood}
            onChange={this.handleChange}
          />
          <div className="moodDesc">
            <center>{this.state.desc}</center>
          </div>
        </div>
        <div>
          <input
            name="note"
            type="text"
            value={this.state.note}
            onChange={this.handleChange}
            onClick={this.clearForm}
          ></input>
        </div>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default CreateEntry;
