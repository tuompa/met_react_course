import React from 'react';
import { connect, } from 'react-redux';
import axios from '../axios';
import Img from '../components/Img';
import { InputDefault, } from '../components/Inputs';
import { ButtonPrimary, } from '../components/Buttons';
import { setUsers, getAllUsers, removeUser, requestDeleteUser, requestUpdateUser, selectUser, setUserRequestError, unSelectUser, updateUser, getUserById, } from '../actions/userActions';

const { keys, } = Object;
const { func, array, string, } = React.PropTypes;

class UserItem extends React.Component {

  render() {
    const { isSelected, imageUrl, name, } = this.props;
    return (
      <div className='user-item-container'>
        <Img className='user-image-thumbnail' src={imageUrl} />
        <div className='user-right-container'>
          <p className='user-item-name'>{name}</p>
          <button className='user-select-button'>{isSelected ? 'unselect' : 'select'}</button>
        </div>
      </div>
    );
  }
}

class UsersComponent extends React.Component {

  static propTypes = {
    getUserById: func,
    selectUser: func,
    selected: string,
    unSelectUser: func,
    users: array,
  };

  render() {
    const { users, selected, } = this.props;
    return (
      <div className='user-list-container'>
        {users.map(user => <UserItem key={user.id} isSelected={user.id === selected} {...user} />)}
      </div>
    );
  }
}

class Todos extends React.Component {
  render() {
    return (
      <div className='todos-list-container'>
        <div className='todo-item'>Must do this</div>
        <div className='todo-item'>Must do that</div>
      </div>
    );
  }
}

class AddUser extends React.Component {

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
      <form onSubmit={this.onSubmit}>
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

class TodoAppContainer extends React.Component {

  componentWillMount() {
    const { getAllUsers, setUsers, } = this.props;
    setUsers([
      { id: '2', name: 's', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSkaOVGeP-KtPVerBW_sLSQq3lZxmZdiOrSMCNi9WnWE0z7PiSbtH0SFq0', },
      { id: 'something', name: 'onni', imageUrl: 'https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg', },
    ]);
    /* getAllUsers()
      .then(({ data, }) => setUsers(data))
      .catch(err => setUserRequestError(err.message));*/
  }

  render() {
    const { user, } = this.props;
    const { data, } = user;
    return (
      <div >
        <AddUser onAddUser={() => {}} />
        <div className='todos-app-container'>
          <div>
            <UsersComponent {...this.props} users={keys(data).map(id => data[id])} selected={user.selected} />
          </div>
          <div>
            <Todos />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, }) => ({ user, });
const mapDispatchToProps = ({
  getAllUsers,
  setUsers,
  setUserRequestError,
  getUserById,
  selectUser,
  unSelectUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoAppContainer);

