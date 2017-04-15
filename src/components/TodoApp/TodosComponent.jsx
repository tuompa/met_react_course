import React from 'react';
import TodoItem from './TodoItem';
const { keys, } = Object;
const { func, object, } = React.PropTypes;

class Todos extends React.Component {

  static propTypes = {
    fetchTodos: func.isRequired,
    selectedUser: object,
    todos: object,
    toggleTodoDone: func.isRequired,
  }

  selectedUserId = null;

  componentWillReceiveProps({ selectedUser, fetchTodos, }) {
    if (selectedUser && selectedUser.id!==this.selectedUserId) {
      this.selectedUserId=selectedUser.id;
      fetchTodos(this.selectedUserId);
    }
  }

  render() {
    const { todos, toggleTodoDone, } = this.props;
    return (
      <div className='todos-list-container'>
        {keys(todos.data).map(id => <TodoItem key={id} {...todos.data[id]} onDoneToggle={toggleTodoDone} />)}
      </div>
    );
  }
}

export default Todos;
