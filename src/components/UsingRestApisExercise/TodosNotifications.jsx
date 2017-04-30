import React from 'react';
import FlipMove from 'react-flip-move';
import TransitionText from './TransitionText';

const { object, bool, } = React.PropTypes;
const { keys, } = Object;

const TodosNotifications = ({ fetchindTodos, userRequests, }) => {
  const { pending, success, error, } = userRequests;
  let acc = [];
  keys(pending).forEach(k => acc.push({
    created: pending[k].created,
    component: (<TransitionText key={k} className='notification-item-pending' text={pending[k].message} />),
  }));
  keys(success).forEach(k => acc.push({
    created: success[k].created,
    component: (<TransitionText key={k} className='notification-item-success' text={success[k].message} />),
  }));
  keys(error).forEach(k => acc.push({
    created: error[k].created,
    component: (<TransitionText key={k} className='notification-item-error' text={error[k].message} />),
  }));
  acc = acc.sort((a, b) => a.created<b.created).map(({ component, }) => component);
  if (fetchindTodos) {
    acc = [
      (<TransitionText key={fetchindTodos} text={'Fetching todos'} className='notification-item-pending' />),
      ...acc,
    ];
  }
  return (
    <div className='todos-notifications'>
      <FlipMove duration={750} easing='ease-out' typeName='div'>
        {acc}
      </FlipMove>
    </div>
  );
};
TodosNotifications.propTypes = {
  fetchindTodos: bool,
  userRequests: object,
};
export default TodosNotifications;
