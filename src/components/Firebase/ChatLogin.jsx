import React from 'react';
import {values,} from '../../utils';
import {ButtonPrimary,} from '../Buttons';
import {InputDefault,} from '../Inputs';

const {object,func,} = React.PropTypes;
export default class ChatLogin extends React.Component {

  static propTypes = {
    users: object,
    onSubmit: func,
  }

  state = {isValid: false,username: '',};


  validateUsername(username) {
    const {users,} = this.props;
    return username.length>2 && !values(users)
      .some(({username: other,})=>other===username);
  }

  handleSubmit = (e) => {
    try { e.preventDefault(); } catch (e) {}
    if (this.state.isValid) {
      this.props.onSubmit(this.state.username);
    }
  }

  render() {
    const {username,isValid,} = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <InputDefault
          value={username}
          placeholder="username"
          onChange={username=>this.setState({username,isValid: this.validateUsername(username),})}
        />
        <ButtonPrimary onClick={this.handleSubmit} disabled={!isValid}>Submit</ButtonPrimary>
      </form>);
  }
}
