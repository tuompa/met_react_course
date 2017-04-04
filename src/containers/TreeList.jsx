import React from 'react';
import StateNode from 'containers/StateNode';
import 'styles/treelist.css';

export default class TreeList extends React.Component {

  static propTypes = {
    objectRoot: React.PropTypes.object,
  };

  static defaultProps = {
    objectRoot: {},
  };

  render() {
    const { objectRoot, } = this.props;
    return (
      <div>
        {Object.keys(objectRoot)
            .map(k => ({ k, v: objectRoot[k], }))
            .map(({ k, v, }) => (<div key={k}>
              <StateNode
                name={k}
                subject={v}
              />
            </div>)
            )}
      </div>
    );
  }
}

