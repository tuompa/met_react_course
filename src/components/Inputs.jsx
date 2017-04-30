
import React from 'react';

const { string, func, any, } = React.PropTypes;
const InputDefault = ({ value, className='', placeholder, type='text', onChange = () => console.log('on change not implemented'), }) => (
  <input
    type={type}
    value={value}
    className={`input-default ${className}`}
    placeholder={placeholder}
    onChange={e => onChange(e.target.value)} />
);
InputDefault.propTypes = {
  className: string,
  placeholder: string,
  type: string,
  onChange: func,
  value: any,
};
exports.InputDefault = InputDefault;
