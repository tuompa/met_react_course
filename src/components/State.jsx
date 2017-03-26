import React from 'react';

export default class State extends React.Component {

  state = { text: 'hello' }

  render() {
    return (
      <div>
        {this.state.text}
      </div>
    );
  }
}
