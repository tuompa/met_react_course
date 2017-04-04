import React from 'react';
import { connect, } from 'react-redux';
import axios from '../axios';
import { setUsers, getAllUsers, removeUser, requestDeleteUser, requestUpdateUser, selectUser, setUserRequestError, unSelectUser, updateUser, getUserById, } from '../actions/userActions';

const { keys, } = Object;
const { func, array, string, } = React.PropTypes;

class UserItem extends React.Component {

  render() {
    const { isSelected, imageUrl, name, } = this.props;
    return (
      <div className="user-item-container">
        <img className="user-image-thumbnail" src={imageUrl} role="presentation" />
        <div style={{display:'flex', flexDirection:'column'}}>
          <p className="user-item-name">{name}</p>
          <button className="user-select-button">{isSelected ? 'unselect' : 'select'}</button>
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
      <div className="user-list-container">
        {users.map(user => <UserItem key={user.id} isSelected={user.id === selected} {...user} />)}
      </div>
    );
  }
}

class Todos extends React.Component{
  render(){
    return (
      <div className="todos-list-container">
        <div className="todo-item">Must do this</div>
        <div className="todo-item">Must do that</div>
      </div>
    )
  }
}

class TodoAppContainer extends React.Component {

  componentWillMount() {
    const { getAllUsers, setUsers, } = this.props;
    setUsers([
      {id:'2', name:'kalle', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSkaOVGeP-KtPVerBW_sLSQq3lZxmZdiOrSMCNi9WnWE0z7PiSbtH0SFq0'},
      {id:'something', name:'onni', imageUrl: 'https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg'},
      ])
    /*getAllUsers()
      .then(({ data, }) => setUsers(data))
      .catch(err => setUserRequestError(err.message));*/
  }

  render() {
    const { user, } = this.props;
    const { data, } = user;
    return (
      <div className="todos-app-container">
        <div>
          <UsersComponent {...this.props} users={keys(data).map(id => data[id])} selected={user.selected} />
        </div>
        <div>
          <Todos/>
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

