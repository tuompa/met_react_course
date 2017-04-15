import React from 'react';

const { string, any, bool, } = React.PropTypes;
const { keys, } = Object;
const notEmpty = obj => obj instanceof Object && keys(obj).length > 0;
export default class StateNode extends React.Component {

  static propTypes = {
    name: string.isRequired,
    subject: any,
    parentIsArray: bool,
  };

  state = { visible: true, };

  render() {
    const { visible, } = this.state;
    const { name, subject, parentIsArray, } = this.props;
    const hasChildren = subject instanceof Object && notEmpty(subject);
    const subjectIsArray= subject instanceof Array;
    if (hasChildren) {
      return (
        <div>
          <div className='inline'>
            <span>{(parentIsArray ? '-' : name)}</span>
            <i onClick={e => { e.preventDefault(); this.setState({ visible: !visible, }); }} className={`tree-list-arrow fa fa-arrow-${visible ? 'up' : 'down'}`} />
            {subjectIsArray && <span>[</span>}
          </div>
          <ul className='tree-list'>
            {visible && keys(subject).map(k => ({ k, v: subject[k], }))
              .map(
                ({ k, v, }) => (
                  <li key={k}>
                    <StateNode
                      parentIsArray={subjectIsArray}
                      subject={v}
                      name={k} />
                  </li>))}
            {subjectIsArray && ']'}
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
