import React from 'react';
import {connect,} from 'react-redux';
import Img from '../components/Img';
import {ButtonWarning,ButtonPrimary,} from '../components/Buttons';

const {func,string,bool,arrayOf,} = React.PropTypes;

const ImageItem = (props)=>{
  const {url,removeImage,selectImage,isSelected,} = props;
  return (<div key={url} className="thump-nail-item">
    <ButtonWarning className="centered-foreground-item" onClick={()=>removeImage(url)}>Remove</ButtonWarning>
    <Img src={url} className={isSelected ? 'url-thump-nail-selected' : 'url-thump-nail'} />
    <ButtonPrimary className="centered-foreground-item" onClick={()=>selectImage(url)}>Select</ButtonPrimary>
  </div>);
};

ImageItem.propTypes = {
  selectImage: func,
  removeImage: func,
  isSelected: bool,
  url: string,
};


const ImageGallery = (props)=>{
  const {selectImage,selectedImage,images,removeImage,} = props;
  return (
    <div>
      <div className="thump-nail-container">
        {images.map(url=>(<ImageItem key={url} url={url} selectImage={selectImage} removeImage={removeImage} isSelected={selectedImage === url} />))}
      </div>
      <Img key={selectedImage} src={selectedImage} className="selected-item" />
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
const mapStateToProps = state=>({
  selectedImage: state.image.selectedImage,
  images: state.image.images,
});
const mapDispatchToProps = ({
  selectImage: url=>dispatch=>dispatch({type: 'SELECT_IMAGE',payload: url,}),
  removeImage: url=>dispatch=>dispatch({type: 'REMOVE_IMAGE',payload: url,}),
});

export default connect(mapStateToProps,mapDispatchToProps)(ImageGallery);
