import React from 'react';

class List extends React.Component {
  state={ newItemValue: '' };
  render() {
    const { removeItem, modifyItem, items } = this.props;
    return (
      <ul>
        <input value={this.state.newItemValue} onChange={this.setNewItemValue} />
        <button onClick={this.onAddItem}>
          Add
        </button>
        {Object.keys(items).map(k => items[k]).map(item => (<li key={item.id}><input value={item.name} onChange={e => modifyItem({ ...item, name: e.target.value })} />
          <button onClick={() => removeItem(item)}>Remove
          </button>
        </li>))
        }
      </ul>
    );
  }
  setNewItemValue = (e) => {
    this.setState({ newItemValue: e.target.value });
  }
  onAddItem = () => {
    this.props.addItem(this.state.newItemValue);
    this.setState({ newItemValue: '' });
  }
}

export default List;
