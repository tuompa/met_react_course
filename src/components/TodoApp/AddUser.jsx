import React from 'react';
import {InputDefault} from '../Inputs';
import {ButtonPrimary} from '../Buttons';

const { func, } = React.PropTypes;
export default class AddUser extends React.Component {

  static propTypes = {
    onAddUser: func.isRequired,
  };

  state = { name: '', imageUrl: '', };

  onSubmit = (e) => {
    e.preventDefault();
    const { name, imageUrl, } = this.state;
    if (name && imageUrl) {
      this.props.onAddUser({ name, imageUrl, });
    }
  };

  render() {
    const { name, imageUrl, } = this.state;
    return (
      <form onSubmit={this.onSubmit} className='add-user'>
        <h4>Add user</h4>
        <InputDefault
          placeholder='username'
          value={name}
          onChange={name => this.setState({ name, })} />
        <InputDefault
          placeholder='image url'
          value={imageUrl}
          onChange={imageUrl => this.setState({ imageUrl, })} />
        <ButtonPrimary onClick={this.onSubmit}>Submit</ButtonPrimary>
      </form>
    );
  }
}
