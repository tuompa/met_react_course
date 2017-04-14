import React from 'react';
import { connect, } from 'react-redux';
import { SELECT_IMAGE, REMOVE_IMAGE, } from '../actions/types';
import Img from '../components/Img';
import { ButtonWarning, ButtonPrimary, } from '../components/Buttons';

const { func, string, number, bool, arrayOf, } = React.PropTypes;

const ImageItem = (props) => {
  const { url, removeImage, selectImage, isSelected, } = props;
  return (
    <div key={url} className='thump-nail-item'>
      <ButtonWarning disabled={isSelected} className='centered-foreground-item' onClick={removeImage}>Remove</ButtonWarning>
      <Img src={url} className={isSelected ? 'url-thump-nail-selected' : 'url-thump-nail'} />
      <ButtonPrimary className='centered-foreground-item' onClick={selectImage}>Select</ButtonPrimary>
    </div>
  );
};

ImageItem.propTypes = {
  selectImage: func,
  removeImage: func,
  isSelected: bool,
  url: string,
};

const ImageGallery = (props) => {
  const { selectImage, selectedImage, images, removeImage, } = props;
  return (
    <div className='note-example-m'>
      <div className='thump-nail-container'>
        {images.map((url, index) => (<ImageItem key={url} url={url} selectImage={() => selectImage(index)} removeImage={() => removeImage(index)} isSelected={selectedImage === index} />))}
      </div>
      <Img key={images[selectedImage]} src={images[selectedImage]} className='selected-item' />
    </div>
  );
};

ImageGallery.propTypes = {
  selectImage: func,
  removeImage: func,
  selectedImage: number,
  images: arrayOf(string),
};

/* react-redux allows you to pass state and dispatch to component
props without implementing manually a Connect component*/

const mapStateToProps = state => ({
  selectedImage: state.image.selectedImage,
  images: state.image.images,
});
const mapDispatchToProps = ({
  selectImage: index => dispatch => dispatch({ type: SELECT_IMAGE, payload: index, }),
  removeImage: index => dispatch => dispatch({ type: REMOVE_IMAGE, payload: index, }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageGallery);
