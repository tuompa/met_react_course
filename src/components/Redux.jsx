import React from 'react';

const { keys, } = Object;
const { object, func, } = React.PropTypes;
class Component extends React.Component {

  static propTypes = {
    catBreeds: object.isRequired,
    onBreedAdded: func.isRequired,
    onBreedChanged: func.isRequired,
    onBreedRemoved: func.isRequired,
  };

  state = { newBreedName: '', };

  onNewBreedNameChanged = (e) => {
    const newBreedName = e.target.value;
    this.setState({ newBreedName, });
  };

  addBreed = () => {
    this.props.onBreedAdded(this.state.newBreedName);
    this.setState({ newBreedName: '', });
  };

  render() {
    const { onBreedChanged, onBreedRemoved, catBreeds, } = this.props;
    return (
      <div>
        {keys(catBreeds)
          .map(key => catBreeds[key])
          .map(({ id, name, }) => (
            <div key={id}>
              <input className="input-default" value={name} onChange={e => onBreedChanged({ id, name: e.target.value, })} />
              <button className="button-default" onClick={() => onBreedRemoved(id)}>Remove</button>
            </div>))}
        <input
          value={this.state.newBreedName}
          className="input-default"
          placeholder="new breed"
          onChange={this.onNewBreedNameChanged}
        />
        <button className="button-default" onClick={this.addBreed}>Create</button>
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
    * Context data use to persist application state during route changes. It pretty much like 'App state'
  */
  static contextTypes = {
    store: React.PropTypes.object,
  };

  state = {};

  componentWillMount() {
    /* when the value of context data is changed it does not automatically cause re-render for components,
    * This is why Redux store has a callback function 'subscribe' that get called every time a new
     * store state is generated */
    const { store, } = this.context;
    this.setState(store.getState());
    this.subscription = store.subscribe(() => {
      /*  when new store state is generated, this function is called
      -> Connect (this component) and its  child component 'Component' gets re-rendered'*/
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    /* subscriptions must be unsubscribed when component unmounts*/
    this.subscription();
  }

  render() {
    const { store, } = this.context;
    if (this.state.catBreed) {
      return (
        <Component
          catBreeds={this.state.catBreed}
          onBreedAdded={breedName => store.dispatch({ type: 'ADD_BREED', payload: breedName, })}
          onBreedChanged={breedName => store.dispatch({ type: 'MODIFY_BREED', payload: breedName, })}
          onBreedRemoved={id => store.dispatch({ type: 'REMOVE_BREED', payload: id, })}
        />
      );
    }
    return <div />;
  }
}
export default Connect;
