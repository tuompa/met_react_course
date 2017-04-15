import React from 'react';
import { connect, } from 'react-redux';
import UsersComponent from '../components/TodoApp/UsersComponent';
import TodosComponent from '../components/TodoApp/TodosComponent';
import TodoNotifications from '../components/TodoApp/TodosNotifications';

import { getAllUsers, removeUser, selectUser, unSelectUser, getUserById, createUser, } from '../actions/userActions';
import { fetchTodos, toggleTodoDone, } from '../actions/todoActions';

/* TODO
...currently in this app you can fetch users, and todos by user
* Extend todo app so that you can...
* 1. unselect user to display no todos.
* 2. remove todos
* 3. add todos
* 4. update todos (done / checked)
* 5. update users name and imageUrl
* 6. remove users
* ... all the endpoints needed for this actions are described in api description
* +++++ due to slow responses from server, look into 'optimistic update' (on put, post & delete requests)
* and try to implement it in your reducer state
* */

const TodoAppContainer = ({ todos, users, fetchTodos, getAllUsers, getUserById, unSelectUser, removeUser, createUser, selectUser, }) => (
  <div className='note-exercise-m'>
    <div className='todos-app-container'>
      <TodoNotifications userRequests={users.request} fetchindTodos={todos.isFetching} />
      <div>
        <UsersComponent
          users={users}
          getAllUsers={getAllUsers}
          getUserById={getUserById}
          removeUser={removeUser}
          createUser={createUser}
          selectUser={selectUser}
          selectedUser={users.content.selected}
          unSelectUser={unSelectUser} />
      </div>
      <div>
        <TodosComponent
          todos={todos}
          toggleTodoDone={toggleTodoDone}
          selectedUser={users.content.selected}
          fetchTodos={fetchTodos} />
      </div>
    </div>
  </div>
  );

const mapStateToProps = ({ users, todos, }) => ({ users, todos, });
const mapDispatchToProps = ({
  getAllUsers,
  getUserById,
  selectUser,
  unSelectUser,
  removeUser,
  createUser,
  fetchTodos,
  toggleTodoDone,
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoAppContainer);

