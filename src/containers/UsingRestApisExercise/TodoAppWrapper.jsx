import React from 'react';
import { connect, } from 'react-redux';
import TodoNotifications from '../../components/UsingRestApisExercise/TodosNotifications';

const { object, } = React.PropTypes;
class TodoAppWrapper extends React.Component {

  static propTypes = {
    users: object.isRequired,
    todos: object.isRequired,
  };

  render() {
    const { users, todos, children, } = this.props;
    return (
      <div>
        <TodoNotifications userRequests={users.request} todosRequest={todos.request} />
        <div className='note-exercise-m'>
          <div className='todos-app-container'>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ users, todos, }) => ({ users, todos, });
export default connect(mapStateToProps)(TodoAppWrapper);