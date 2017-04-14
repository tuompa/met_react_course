import React from 'react';
import { InputDefault, } from './Inputs';
import { ButtonPrimary, ButtonWarning, } from './Buttons';
import { ADD_CAT, REMOVE_CAT, CHANGE_CAT_NAME, } from '../actions/types';
import Img from './Img';

const { keys, } = Object;
const { object, func, } = React.PropTypes;
class Component extends React.Component {

  static propTypes = {
    cats: object.isRequired,
    onCatAdded: func.isRequired,
    onCatNameChanged: func.isRequired,
    onCatRemoved: func.isRequired,
  };

  state = { newCatName: '', newCatImg: '', };

  addCat = () => {
    const { newCatName, newCatImg, } = this.state;
    this.props.onCatAdded({ name: newCatName, img: newCatImg, });
    this.setState({ newCatName: '', newCatImg: '', });
  };

  render() {
    const { onCatNameChanged, onCatRemoved, cats, } = this.props;
    const { newCatName, newCatImg, } = this.state;
    return (
      <div>
        <InputDefault
          value={newCatName}
          placeholder='cat name'
          onChange={(newCatName) => this.setState({ newCatName, })} />
        <InputDefault
          value={newCatImg}
          placeholder='cat img'
          onChange={(newCatImg) => this.setState({ newCatImg, })} />
        <ButtonPrimary onClick={this.addCat}>Create</ButtonPrimary>
        {keys(cats)
          .map(key => cats[key])
          .map(({ id, name, img, }) => (
            <div key={id} className='centered-row'>
              <InputDefault value={name} onChange={name => onCatNameChanged({ id, name, })} />
              <ButtonWarning onClick={() => onCatRemoved(id)}>Remove</ButtonWarning>
              <Img className='url-thump-nail' src={img} />
            </div>))}
      </div>
    );
  }
}

class Connect extends React.Component {

  /* contextTypes are a bit like props but they value is mediated indirectly to all child and sub-child
    * components of context provider
    * <Provider>
    *   <Child>
    *    <SubChild />
    *   <Child/>
    * </Provider>
    * Context data is used to persist application state during route changes. It pretty much like 'App state'
  */
  static contextTypes = {
    store: React.PropTypes.object,
  };

  state = {};

  componentWillMount() {
    /* when the value of context data is changed it does not usually automatically cause re-render for
    child components, This is why Redux store has a callback function 'subscribe' that get called every time a new
    store state is generated */
    const { store, } = this.context;
    this.setState(store.getState());
    this.subscription = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    /* subscriptions must be unsubscribed when component unmounts otherwise
    * it will continue to receive context data changes after it not needed*/
    this.subscription();
  }

  render() {
    const { store, } = this.context;
    if (this.state.catBreed) {
      return (
        <Component
          cats={this.state.catBreed}
          onCatAdded={(nameAndImage) => store.dispatch({ type: ADD_CAT, payload: nameAndImage, })}
          onCatNameChanged={breedName => store.dispatch({ type: CHANGE_CAT_NAME, payload: breedName, })}
          onCatRemoved={id => store.dispatch({ type: REMOVE_CAT, payload: id, })} />
      );
    }
    return <div />;
  }
}
export default Connect;
