import React from 'react';

export default class ComponentState extends React.Component {

  reRenders = 0
  maxLength = 15;
  state = { text: 'hello' }

  onTextChanged = (event) => {
    const { value } = event.target;
    if (value.length <= this.maxLength) {
      this.setState({ text: value });
    }
  }

  clearText = () => {
    this.setState({ text: '' });
  }

  render() {
    const { text } = this.state;
    console.log('re-render with', text);
    return (
      <div>
        <p>Number of re-renders {this.reRenders++}</p>
        <input id="random_text" value={text} onChange={this.onTextChanged} />
        <label htmlFor="random_text">{`${text.length}/${this.maxLength}`}</label>
        <button onClick={this.clearText}>Clear</button>
      </div>
    );
  }
}
