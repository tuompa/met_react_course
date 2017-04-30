import React from 'react';
import AddUser from './AddUser';
import UserItem from './UserItem';

const { keys, } = Object;
const { func, object, } = React.PropTypes;

class UsersComponent extends React.Component {

  static propTypes = {
    getAllUsers: func.isRequired,
    getUserById: func.isRequired,
    selectUser: func.isRequired,
    unSelectUser: func.isRequired,
    removeUser: func.isRequired,
    users: object.isRequired,
    createUser: func.isRequired,
  };

  render() {
    const { users, createUser, removeUser, selectUser, unSelectUser, } = this.props;
    const { data, selected, } = users.content;
    return (
      <div className='user-list-container'>
        {keys(data).map(id => (
          <UserItem
            key={id}
            {...data[id]}
            isSelected={selected && id === selected.id}
            onRemove={removeUser}
            onUnSelect={unSelectUser}
            onSelect={selectUser} />))}
        <AddUser onAddUser={({ name, imageUrl, }) => createUser({ name, imageUrl, })} />
      </div>
    );
  }

  componentDidMount() {
    this.props.getAllUsers();
  }
}

export default UsersComponent;
