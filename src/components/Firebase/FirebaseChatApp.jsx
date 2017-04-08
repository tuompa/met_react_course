import React from 'react';
import dbRef from '../firebaseDatabase';
import {ButtonPrimary,} from './Buttons';
import {InputDefault,} from './Inputs';

const {keys,} = Object;

const values = (obj)=>{
  try {
    return keys(obj).map(key=>obj[key]);
  } catch (e) {
    return [];
  }
};
const chat = dbRef.child('chat');

const {object,} = React.PropTypes;
class ChatLogin extends React.Component {

  static propTypes = {
    users: object,
  }

  static defaultProps = {
    users: {},
  }

  state = {valid: false,username: '',};


  validateUsername(username) {
    const {users,} = this.props;
    return !values(users)
      .some(({username: other,})=>other===username);
  }

  render() {
    const {username,} = this.state;
    return (
      <InputDefault
        isValid={this.validateUsername(username)}
        value={username}
        placeholder="username"
        onChange={username=>this.setState({username,})}
      />);
  }

}

class FirebaseConnector extends React.Component {

  state = {username: null,users: null,messages: [],};

  componentWillMount() {
    console.log(chat);
    this.users = chat.child('users');
    this.messages= chat.child('messages');
    this.users.on('value',(next)=>{
      console.log({name: next.val(),key: next.key,});
      this.setState({users: next.val(),});
    });
    // this.messages.push({text: 'hello chat',sent: new Date().toISOString(),});
    this.messages = this.users
      .limitToLast(500).on('value',(next)=>{
        console.log({msg: next.val(),key: next.key,});
        this.setState({messages: next.val(),});
      });
  }

  componentWillUnmount() {
    this.users.off('value',err=>console.log(err));
    this.messages.off('child_added',err=>console.log(err));
    chat.off('value',err=>console.log(err));
  }

  render() {
    const {username,} = this.state;
    if (username) {
      return <FirebaseChat/>;
    }
    return <ChatLogin users={this.state.users}/>;
  }


}

class FirebaseChat extends React.Component {


  state = {newBreedName: '',};

  onNewBreedNameChanged = (e)=>{
    const newBreedName = e.target.value;
    this.setState({newBreedName,});
  };

  addBreed = ()=>{
    this.props.onBreedAdded(this.state.newBreedName);
    this.setState({newBreedName: '',});
  };

  render() {
    return (
      <div className="chat-app">
        <div className="chat-upper-container">
          <div className="chat-feed">
        hello
        </div>
          <div className="chat-users">
          hello
        </div>
        </div>
        <div className="chat-lower-container">
          <ValidateInput className="chat-input"/>
          <ButtonPrimary className="chat-submit">Send</ButtonPrimary>
        </div>
      </div>
    );
  }
}
export default FirebaseConnector;
