/**
 * Created by joonaenbuska on 18/01/2017.
 */
import React from 'react';
const { bool, func, string, } = React.PropTypes;

const SidebarItem = ({ children }) => (
  <div className="sidebar-item">
    {children}
  </div>
  );

exports.SidebarItem = SidebarItem;

const SidebarLink = ({ id, selected, onClick, children }) => (
  <div
    id={id}
    className={`sidebar-link ${selected && 'selected-link'}`}
    onClick={onClick}
  >{children}</div>
  );
SidebarLink.propTypes = {
  id: string,
  selected: bool,
  onClick: func,
};
exports.SidebarLink = SidebarLink;

const SidebarHomeItem = ({ id, selected, onClick }) => (
  <div id={id} className="sidebar-item-small" onClick={onClick}>
    <i className={`sidebar-link fa fa-home sidebar-home ${selected && 'selected-link'}`} />
  </div>
  );
SidebarHomeItem.propTypes = {
  id: string,
  selected: bool,
  onClick: func,
};
exports.SidebarHomeItem = SidebarHomeItem;


const SidebarPenLink = ({ id, selected, onClick }) => (
  <i
    className={`fa fa-pencil sidebar-link sidebar-pencil ${selected && 'selected-link'}`}
    id={id} onClick={onClick}
  />
  );
SidebarPenLink.propTypes = {
  id: string,
  selected: bool,
  onClick: func,
};
exports.SidebarPenLink = SidebarPenLink;
