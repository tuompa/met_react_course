import React, { Component, } from 'react';
const { string, any, } = React.PropTypes;
const { keys, } = Object;
const notEmpty = obj => obj instanceof Object && keys(obj).length > 0;
export default class StateNode extends Component {

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
          <div className="inline">
            <span>{name}</span>
          </div>
          <ul className="tree-list">
            <button onClick={() => this.setState({ visible: !visible, })}>
              <i className={`fa fa-arrow-${visible ? 'up' : 'down'}`} />
            </button>
            {visible && keys(subject).map(k => ({ k, v: subject[k], }))
              .map(
                ({ k, v, }) => (
                  <li key={k}>
                    <StateNode
                      subject={v}
                      name={k}
                    />
                  </li>))}
          </ul>
        </div>
      );
    }
    return (
      <div className="inline">
        <span>{name}</span>
        <span> - </span>
        {subject}
      </div>
    );
  }
}
