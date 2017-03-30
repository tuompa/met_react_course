import React from 'react';
import catComplete from '../images/cat-complete.png';
const { func, string } = React.PropTypes;
class ValidateInput extends React.Component {

  static propTypes = {
    validate: func.isRequired,
    placeholder: string.isRequired,
  }

  state = { text: '', invalid: false }

  onTextChanged = (event) => {
    const text = event.target.value;
    const nextState = { text };
    /* TODO
    if state is invalid but nextState is valid set invalid to false */
    const { invalid } = this.state;

    const { validate } = this.props;
    if (invalid && validate(text)) {
      nextState.invalid = false;
    }
    this.setState(nextState);
  }

  onBlur= () => {
    const { text } = this.state;
    const { validate } = this.props;
    const nextState = {};
    if (!validate(text)) {
      nextState.invalid = true;
    }
    this.setState(nextState);
  }

  render() {
    const { text, invalid } = this.state;
    return (
      <div className="validate-input-container">
        <input
          placeholder={this.props.placeholder}
          className={invalid ? 'input-default' : 'invalid-input'}
          onChange={this.onTextChanged}
          value={text}
          onBlur={this.onBlur}
        />
        <img className={invalid ? 'invalid-indicator-visible' : 'invalid-indicator-hidden'} src={catComplete} />
      </div>
    );
  }


}

export default class Component extends React.Component {

  state = { searching: false };

  render() {
    return (
      <div>
        <h1>{this.state.header}</h1>
        <ValidateInput validate={text => text.length > 8} placeholder={'8 or more characters'} />

      </div>
    );
  }
}

