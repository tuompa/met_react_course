import React from 'react';
import { browserHistory } from 'react-router';
import { SidebarItem, SidebarLink, SidebarPenLink, SidebarHomeItem } from './SidebarContent';

const LINKS = {
  '/jsxSyntax': 'JSX Syntax',
  '/state': 'Component State',
};

export default class Sidebar extends React.Component {

  state = { pathname: null };
  componentWillMount() {
    this.setState({ pathname: browserHistory.getCurrentLocation().pathname });
    this.routeSubscription = browserHistory.listen(({ pathname }) => this.setState({ pathname }));
  }

  render() {
    const { pathname } = this.state;
    return (
      <section id="sidebar" className="sidebar" >
        <SidebarHomeItem selected={pathname === '/'} onClick={() => browserHistory.push('/')} id="homeLink" />
        {Object.keys(LINKS).map(key => (
          <SidebarItem key={key}>
            <SidebarLink
              onClick={() => { browserHistory.push(key); }}
              selected={key === pathname}
            >
              {LINKS[key]}
            </SidebarLink>
            <SidebarPenLink
              selected={pathname === ''}
              onClick={() => { browserHistory.push(key+'/exercise')}}
            />
          </SidebarItem>))}
      </section>
    );
  }

}
