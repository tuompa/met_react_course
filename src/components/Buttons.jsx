import React from 'react';

function handleClick(e,onClick) {
  e.preventDefault();//prevent default for forms
  onClick();
}

const {log,} = console;
const {func,string,} = React.PropTypes;
const ButtonDefault = ({onClick=()=>log('onClick not implemented'),className='',children,})=>(
  <button
    className={`button-default ${className}`}
    onClick={e=>handleClick(e,onClick())}
  >
    {children}
  </button>);
ButtonDefault.propTypes = {
  onClick: func,
  className: string,
};
const ButtonPrimary = ({onClick=()=>log('onClick not implemented'),className='',children,})=>(
  <button
    className={`button-primary ${className}`}
    onClick={e=>handleClick(e,onClick())}
  >
    {children}
  </button>);
ButtonPrimary.propTypes = {
  onClick: func,
  className: string,
};
const ButtonWarning = ({onClick=()=>log('onClick not implemented'),className='',children,})=>(
  <button
    className={`button-warning ${className}`}
    onClick={e=>handleClick(e,onClick())}
  >
    {children}
  </button>);
ButtonWarning.propTypes = {
  onClick: func,
  className: string,
};
exports.ButtonDefault = ButtonDefault;
exports.ButtonPrimary = ButtonPrimary;
exports.ButtonWarning = ButtonWarning;
