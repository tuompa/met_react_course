import React from 'react';
import axios from '../axios';
import TreeList from 'containers/TreeList';

export default class FetchingData extends React.Component {

  state = { status: 'idle', data: {}, };

  sendRequest = async () => {
    const { data, } = await axios.get('/',);
    this.setState({ status: 'data fetched', data, });
  };

  fetchOptions = () => {
    this.sendRequest();
    this.setState({ status: 'fetching data', });
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
