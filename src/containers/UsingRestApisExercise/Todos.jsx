import React from 'react';
import { connect, } from 'react-redux';
import * as todoActions from '../../actions/todoActions';
import * as userActions from '../../actions/userActions';
import TodoItem from '../../components/UsingRestApisExercise/TodoItem';
import UserProfile from '../../components/UsingRestApisExercise/UserProfile';

const { keys, } = Object;
const { func, object, } = React.PropTypes;

// TODO implement todos actions and UserProfile component
class Todos extends React.Component {

  static propTypes = {
    fetchTodos: func.isRequired,
    addTodo: func.isRequired,
    getUserById: func.isRequired,
    removeTodo: func.isRequired,
    toggleTodoDone: func.isRequired,
    todosContent: object.isRequired,
    usersContent: object.isRequired,
  }

  render() {
    const { todosContent, usersContent, toggleTodoDone, removeTodo, } = this.props;
    return (
      <div className='todos-list-container'>
        {/* Todo implement back click to get to previous route*/}
        { /* Todo implement add todo */ }
        <UserProfile /> {/* Todo pass right properties to UserProfile*/}
        {keys(todosContent).map(id => <TodoItem
          key={id}
          onDoneToggle={toggleTodoDone}
          onRemove={removeTodo}
          {...todosContent[id]} />)}
      </div>
    );
  }

  componentDidMount() {
    const { userId, } = this.props.params;
    // TODO fetch user by id and todos by userId
  }

}

const { addTodo, fetchTodos, toggleTodoDone, removeTodo, } = todoActions;
const { getUserById, } = userActions;

const mapStateToProps = ({ todos, users, }) => ({ todosContent: todos.content, usersContent: users.content, });
const mapDispatchToProps = ({
  fetchTodos,
  addTodo,
  toggleTodoDone,
  removeTodo,
  getUserById,
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
