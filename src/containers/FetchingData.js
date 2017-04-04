import React from 'react';
import axios from '../axios';
import TreeList from 'components/TreeList';

export default class FetchingData extends React.Component {

  state = { status: 'idle', data: {}, };

  fetchOptions = async () => {
    this.setState({ status: 'fetching data', });
    const { data, } = await axios.get('/');
    this.setState({ status: 'data fetched', data, });
  };

  render() {
    const { status, data, } = this.state;
    return (
      <div>
        <h3>{status}</h3>
        <button className="button-primary" onClick={this.fetchOptions}>Fetch api description</button>
        <TreeList objectRoot={data} />
      </div>
    );
  }
}
