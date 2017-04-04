import React from 'react';
import { browserHistory, } from 'react-router';
import { SidebarItem, SidebarLink, SidebarPenLink, SidebarHomeItem, } from './SidebarContent';

const LINKS = [
  { path: '/jsxSyntax', name: 'JSX Syntax', exercise: true, },
  { path: '/Lists', name: 'JSX Lists', exercise: true, },
  { path: '/componentState', name: 'Component State', exercise: true, },
  { path: '/componentProps', name: 'Component Props', exercise: true, },
  { path: '/componentLifecycle', name: 'Component Lifecycle', },
  { path: '/Redux', name: 'Redux', },
  { path: '/react-redux', name: 'React Redux', exercise: true, },
  { path: '/fetcing-data', name: 'Fetch Data', exercise: true, },
];

export default class Sidebar extends React.Component {

  state = { pathname: null, };
  componentWillMount() {
    this.setState({ pathname: browserHistory.getCurrentLocation().pathname, });
    this.routeSubscription = browserHistory.listen(({ pathname, }) => this.setState({ pathname, }));
  }

  render() {
    const { pathname, } = this.state;
    return (
      <section id="sidebar" className="sidebar" >
        <SidebarHomeItem selected={pathname === '/'} onClick={() => browserHistory.push('/')} id="homeLink" />
        {LINKS.map(({ path, name, exercise, }) => (
          <SidebarItem key={path}>
            <SidebarLink
              onClick={() => { browserHistory.push(path); }}
              selected={path === pathname}
            >
              {name}
            </SidebarLink>
            {exercise && (<SidebarPenLink
              selected={(`${path}/exercise`) === pathname}
              onClick={() => { browserHistory.push(`${path}/exercise`); }}
            />)}
          </SidebarItem>))}
      </section>
    );
  }

}
