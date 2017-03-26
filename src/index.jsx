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
import reducers from 'reducers';
import 'styles';
import JSXSyntax from 'components/JSXSyntax';
import JSXSyntaxExercise from 'components/JSXSyntaxExercise';
import Lists from 'components/Lists';
import ListsExercise from 'components/ListExercise';
import ComponentProps from 'components/ComponentProps';
import ReusableComponents from 'components/ReusableComponents';

const middleware = [thunk];
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const store = createStoreWithMiddleware(reducers, window.devToolsExtension && window.devToolsExtension());

const router = (
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
        <Route path="/reusableComponents" component={ReusableComponents} />
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(router, document.getElementById('app'));
