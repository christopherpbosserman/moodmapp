import React from 'react';

class CreateEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: '', mood: '3', desc: 'OK' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    // alert('A mood was submitted: ' + this.state.mood + ' ' + this.state.date);
    console.log(this.state);
    // event.preventDefault();

    // on submit
    // check if date already exists, if so prompt user
    // if they want to update use update route
    // if doesnt exist use create route
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

    this.getDate();
    this.setState({ mood: '3' });
  }

  getDate() {
    const date = new Date().toISOString().slice(0, 10);
    this.setState({ date: date });
  }

  componentDidMount() {
    this.getDate();
  }

  render() {
    return (
      // <div className="createEntry">
      <form
        className={`createEntry mood${this.state.mood}`}
        onSubmit={this.handleSubmit}
      >
        <div>
          <input
            name="date"
            type="date"
            // defaultValue={this.state.date}
            value={this.state.date}
            onChange={this.handleChange}
          />
        </div>
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

        <input type="submit" value="Submit" />
      </form>
      // </div>
    );
  }
}

export default CreateEntry;
