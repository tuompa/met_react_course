import React from 'react';
import { connect } from 'react-redux';

const { func, string, bool, arrayOf } = React.PropTypes;

const Image = (props) => {
  const { url, removeImage, selectImage, isSelected } = props;
  return (<div key={url} className="thump-nail-item">
    <button className="centered-foreground-item button-warning " onClick={() => removeImage(url)}>Remove</button>
    <img src={url} alt="presentation" className={isSelected ? 'url-thump-nail-selected' : 'url-thump-nail'} />
    <button className="centered-foreground-item button-primary" onClick={() => selectImage(url)}>Select</button>
  </div>);
};

Image.propTypes = {
  selectImage: func,
  removeImage: func,
  isSelected: bool,
  url: string,
};


const ImageGallery = (props) => {
  const { selectImage, selectedImage, images, removeImage } = props;
  return (
    <div>
      <div className="thump-nail-container">
        {images.map(url => (<Image key={url} url={url} selectImage={selectImage} removeImage={removeImage} isSelected={selectedImage === url} />))}
      </div>
          <img key={selectedImage} alt="presentation" src={selectedImage} className="selected-item" />
    </div>
  );
};

ImageGallery.propTypes = {
  selectImage: func,
  removeImage: func,
  selectedImage: string,
  images: arrayOf(string),
};

/* 'state' is redux store state*/
const mapStateToProps = state => ({
  selectedImage: state.image.selectedImage,
  images: state.image.images,
});
const mapDispatchToProps = ({
  selectImage: url => dispatch => dispatch({ type: 'SELECT_IMAGE', payload: url }),
  removeImage: url => dispatch => dispatch({ type: 'REMOVE_IMAGE', payload: url }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageGallery);
