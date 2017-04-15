import React from 'react';
import FlipMove from 'react-flip-move';

const { string, any, } = React.PropTypes;
const { keys, } = Object;
const notEmpty = obj => obj instanceof Object && keys(obj).length > 0;
export default class StateNode extends React.Component {

  static propTypes = {
    name: string.isRequired,
    subject: any,
  };

  state = { visible: true, };

  render() {
    const { visible, } = this.state;
    const { name, subject, } = this.props;
    const hasChildren = subject instanceof Object && notEmpty(subject);
    if (hasChildren) {
      return (
        <div>
          <div className='inline'>
            <span>{name}</span>
            <i onClick={e => { e.preventDefault(); this.setState({ visible: !visible, }); }} className={`tree-list-arrow fa fa-arrow-${visible ? 'up' : 'down'}`} />
          </div>
          <ul className='tree-list'>

            {visible && keys(subject).map(k => ({ k, v: subject[k], }))
              .map(
                ({ k, v, }) => (
                  <li key={k}>
                    <StateNode
                      subject={v}
                      name={k} />
                  </li>))}
          </ul>
        </div>
      );
    }
    return (
      <div className='inline'>
        <span>{name}</span>
        <span> - </span>
        {subject}
      </div>
    );
  }
}
