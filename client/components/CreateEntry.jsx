import React from 'react';

class CreateEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: '', mood: '3' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({ [name]: target.value });
  }

  handleSubmit(event) {
    alert('A mood was submitted: ' + this.state.mood + ' ' + this.state.date);
    event.preventDefault();
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
      <form onSubmit={this.handleSubmit}>
        <label>
          <div>
            Date:
            <input
              name="date"
              type="date"
              // defaultValue={this.state.date}
              value={this.state.date}
              onChange={this.handleChange}
            />
          </div>
          <div>
            Mood:
            <input
              name="mood"
              type="range"
              min="1"
              max="5"
              value={this.state.mood}
              onChange={this.handleChange}
            />
            {this.state.mood}
          </div>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default CreateEntry;
