import React from 'react';
import axios from '../axios';
import { ButtonPrimary, } from '../components/Buttons';
import TreeList from '../components/TreeList';

export default class UsingRestApis extends React.Component {

  state = { status: 'idle', data: {}, };

  fetchApiDescription = async () => {
    this.setState({ status: 'fetching data', });
    const { data, } = await axios.get('/');
    this.setState({ status: 'data fetched', data, });
  };

  render() {
    const { status, data, } = this.state;
    return (
      <div className='note-example-m'>
        <h3>{status}</h3>
        <ButtonPrimary onClick={this.fetchApiDescription}>Fetch api description</ButtonPrimary>
        <TreeList objectRoot={data} />
      </div>
    );
  }
}
