import React, { Component, } from 'react';
const blackStyle = { color: 'black', };
const { string, any, } = React.PropTypes;
const { keys, } = Object;
const notEmpty = obj => obj instanceof Object && keys(obj).length > 0;
export default class StateNode extends Component {

  static propTypes = {
    name: string.isRequired,
    subject: any,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.subject, });
  }

  render() {
    const { name, subject, } = this.props;
    const hasChildren = subject instanceof Object && notEmpty(subject);
    if (hasChildren) {
      return (
        <div>
          <div className="inline">
            <span style={blackStyle}>{name}</span>
          </div>
          <ul className="list">
            {keys(subject).map(k => ({ k, v: subject[k], }))
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
        <span style={blackStyle}>{name}</span>
        <span> - </span>
        {subject}
      </div>
    );
  }
}
