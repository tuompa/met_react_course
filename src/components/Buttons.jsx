import React from 'react';

function handleClick(e, onClick) {
  try {
    e.preventDefault();// prevent default for forms
  } catch (Exception) {

  }
  onClick(e);
}

const { log, } = console;
const { func, string, bool, } = React.PropTypes;
const ButtonDefault = ({ onClick=() => log('onClick not implemented'), className='', children, disabled, }) => (
  <button
    className={`button-default ${className}`}
    disabled={disabled}
    onClick={e => handleClick(e, onClick)}>
    {children}
  </button>);
ButtonDefault.propTypes = {
  onClick: func,
  className: string,
  disabled: bool,
};
const ButtonPrimary = ({ onClick=() => log('onClick not implemented'), className='', children, disabled, }) => (
  <button
    className={`button-primary ${className}`}
    disabled={disabled}
    onClick={e => handleClick(e, onClick)}>
    {children}
  </button>);
ButtonPrimary.propTypes = {
  onClick: func,
  className: string,
  disabled: bool,
};
const ButtonWarning = ({ onClick=() => log('onClick not implemented'), className='', children, disabled, }) => (
  <button
    className={`button-warning ${className}`}
    disabled={disabled}
    onClick={e => handleClick(e, onClick)}>
    {children}
  </button>);
ButtonWarning.propTypes = {
  onClick: func,
  className: string,
  disabled: bool,
};
exports.ButtonDefault = ButtonDefault;
exports.ButtonPrimary = ButtonPrimary;
exports.ButtonWarning = ButtonWarning;
