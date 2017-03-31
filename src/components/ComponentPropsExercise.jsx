import React from 'react';
import catComplete from '../images/cat-complete.png';
const { func, string } = React.PropTypes;
class ValidateInput extends React.Component {

  static propTypes = {
    validate: func.isRequired,
    placeholder: string.isRequired,
    type: string.isRequired,
  }

  defaultProps = {
    type: 'text',
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
    const { type } = this.props;
    return (
      <div className="validate-input-container">
        <input
          type={type}
          placeholder={this.props.placeholder}
          className={invalid ? 'invalid-input' : 'input-default'}
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
  emailRegex = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;

  render() {
    return (
      <div>
        <h1>{this.state.header}</h1>
        <ValidateInput validate={text => this.emailRegex.test(text)} type="email" placeholder={'email'} />
        <ValidateInput validate={text => text.length > 8} type="password" placeholder={'8 or more characters'} />
      </div>
    );
  }
}

