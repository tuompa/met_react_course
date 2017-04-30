import React from 'react';
import Img from '../Img';

const { func, string, bool, } = React.PropTypes;

const UserItem = ({ id, imageUrl, name, onSelect, onRemove, }) => (
  <div className={'user-item-container'}>
    <Img className='user-image-thumbnail' src={imageUrl} />
    <div className='user-right-container'>
      <p className='user-item-name'>{name}</p>
      <button onClick={() => onSelect(id)} className='user-select-button'>Select</button>
      <button onClick={() => onRemove(id)} className='user-select-button'>Remove</button>
    </div>
  </div>
);

UserItem.propTypes = {
  imageUrl: string,
  name: string,
  onSelect: func,
  onRemove: func,
};

export default UserItem;