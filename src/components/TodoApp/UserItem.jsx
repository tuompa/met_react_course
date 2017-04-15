import React from 'react';
import Img from '../Img';

const { func, string, bool, } = React.PropTypes;

const UserItem = ({ id, isSelected, imageUrl, name, onSelect, onUnSelect, onRemove, }) => (
  <div className={isSelected ? 'user-item-container-selected' : 'user-item-container'}>
    <Img className='user-image-thumbnail' src={imageUrl} />
    <div className='user-right-container'>
      <p className='user-item-name'>{name}</p>
      <button onClick={() => isSelected ? onUnSelect() : onSelect(id)} className='user-select-button'>{isSelected ? 'unselect' : 'select'}</button>
      <button onClick={() => onRemove(id)} className='user-select-button'>Remove</button>
    </div>
  </div>
);

UserItem.propTypes = {
  isSelected: bool,
  imageUrl: string,
  name: string,
  onSelect: func,
  onRemove: func,
  onUnSelect: func,
};

export default UserItem;