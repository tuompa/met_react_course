import React from 'react';
import AddUser from '../../components/UsingRestApisExercise/AddUser';
import UserListItem from '../../components/UsingRestApisExercise/UserListItem';

const { keys, } = Object;
const { func, object, } = React.PropTypes;

class UsersComponent extends React.Component {

  static propTypes = {
    selectUser: func.isRequired,
    removeUser: func.isRequired,
    users: object.isRequired,
    createUser: func.isRequired,
  };

  render() {
    const { users, createUser, removeUser, selectUser, } = this.props;
    const { data, } = users.content;
    return (
      <div className='user-list-container'>
        {keys(data).map(id => (
          <UserListItem
            key={id}
            {...data[id]}
            onRemove={removeUser}
            onSelect={selectUser} />))}
        <AddUser onAddUser={({ name, imageUrl, }) => createUser({ name, imageUrl, })} />
      </div>
    );
  }
}

export default UsersComponent;
