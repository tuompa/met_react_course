import React from 'react';

const RemoveIcon = ({ onRemove }) => {
  return (
    <span className='remove-icon' onClick={onRemove}>
      <i className='fa fa-trash' />
  </span>
  );
};

export default RemoveIcon;