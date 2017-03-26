import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from 'components/App';
import Home from 'components/Home';
import State from 'components/State';
import reducers from 'reducers';
import 'styles';
import JSXSyntax from 'components/JSXSyntax';
import JSXSyntaxExercise from 'components/JSXSyntaxExercise';

const middleware = [ thunk, ];
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const store = createStoreWithMiddleware(reducers, window.devToolsExtension && window.devToolsExtension());

const router = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/jsxSyntax/exercise" component={JSXSyntax} />
        <Route path="/jsxSyntax" component={JSXSyntax} />
        <Route path="/state" component={State} />
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(router, document.getElementById('app'));
