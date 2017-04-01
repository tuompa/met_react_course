import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from 'components/App';
import Home from 'components/Home';
import ComponentState from 'components/ComponentState';
import ComponentStateExercise from 'components/ComponentStateExercise';
import ReactRedux from 'components/ReactRedux';
import reducers from 'reducers';
import 'styles';
import JSXSyntax from 'components/JSXSyntax';
import JSXSyntaxExercise from 'components/JSXSyntaxExercise';
import Lists from 'components/Lists';
import ListsExercise from 'components/ListExercise';
import ComponentProps from 'components/ComponentProps';
import ComponentPropsExecrice from 'components/ComponentPropsExercise';
import ReactReduxExercise from 'components/ReactReduxExercise';

const middlewares = [thunk];
let store;
if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  store = createStoreWithMiddleware(reducers, window.devToolsExtension && window.devToolsExtension());
} else {
  store = createStore(reducers, middlewares);
}

const root = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/jsxSyntax" component={JSXSyntax} />
        <Route path="/jsxSyntax/exercise" component={JSXSyntaxExercise} />
        <Route path="/lists" component={Lists} />
        <Route path="/lists/exercise" component={ListsExercise} />
        <Route path="/componentState" component={ComponentState} />
        <Route path="/componentState/exercise" component={ComponentStateExercise} />
        <Route path="/componentProps" component={ComponentProps} />
        <Route path="/componentProps/exercise" component={ComponentPropsExecrice} />
        <Route path="/react-redux" components={ReactRedux}/>
        <Route path="/react-redux/exercise" components={ReactReduxExercise}/>
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(root, document.getElementById('app'));
