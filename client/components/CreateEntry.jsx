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
      today: [],
      done: false,
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

  componentDidMount() {
    console.log(this.state.date);
    fetch(`/api/details?id=${this.state.date}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length !== 0) {
          const { mood, desc } = data[0];
          this.setState({
            mood,
            desc,
            done: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (!this.state.done) {
      return (
        <section>
          <h2>How are you feeling today?</h2>
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
        </section>
      );
    }

    if (this.state.mood < 3) {
      return (
        <section className={`createEntry mood${this.state.mood}`}>
          <center>
            <div className="moodDesc">
              <h5>I'm sorry you are feeling</h5>
              <h3>{this.state.desc}</h3>
              <h5>today.</h5>
            </div>
          </center>
        </section>
      );
    }

    if (this.state.mood >= 3) {
      return (
        <section className={`createEntry mood${this.state.mood}`}>
          <center>
            <div className="moodDesc">
              <h5>I'm glad you are feeling</h5>
              <div>{this.state.desc}</div>
              <h5>today.</h5>
            </div>
          </center>
        </section>
      );
    }
  }
}

export default CreateEntry;
