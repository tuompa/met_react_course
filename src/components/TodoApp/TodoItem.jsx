import React from 'react';

const {string, bool, func} = React.PropTypes;

const TodoItem = ({description, done, onDoneToggle}) => {
  return (<div className='todo-item'>
    <div>{description}</div>
    <input type='checkbox' checked={done} onChange={() => onDoneToggle(!done)} />
  </div>)
};
TodoItem.propTypes = {
  done: bool,
  description: string.isRequired,
  onDoneToggle: func.isRequired
}

export default TodoItem;