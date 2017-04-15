import React from 'react';
import { connect, } from 'react-redux';
import FlipMove from 'react-flip-move';
import {InputDefault} from '../components/Inputs'
import { ButtonPrimary, ButtonWarning, ButtonDefault, } from '../components/Buttons';
import Img from '../components/Img';

const { func, string, number, bool, arrayOf, } = React.PropTypes;

class Image extends React.Component {

  render() {
    const { url, removeImage, selectImage, isSelected, } = this.props;
    return (<div key={url} className='thump-nail-list-item'>
      <div className='image-action-container'>
        <ButtonWarning className='centered-foreground-item' onClick={removeImage}>Remove</ButtonWarning>
        <ButtonPrimary className='centered-foreground-item' onClick={selectImage}>Select</ButtonPrimary>
      </div>
      <Img
        src={url}
        className={isSelected ? 'url-thump-nail-selected' : 'url-thump-nail'} />
    </div>);
  }
}

Image.propTypes = {
  selectImage: func,
  removeImage: func,
  isSelected: bool,
  url: string,
};

class ImageGallery extends React.Component {

  state = { name, imageUrl: '', };

  render() {
    const { selectImage, selectedImage, images, resetImages, } = this.props;
    const {name, imageUrl } = this.state;
    return (
      <div className='note-exercise-l'>
        <div className='flex-row'>
          <InputDefault
            placeholder='name'
            value={name}
            onChange={name => this.setState({ name, })} />
          <InputDefault
            placeholder='image url'
            value={imageUrl}
            onChange={imageUrl => this.setState({ imageUrl, })} />
          <ButtonPrimary onClick={() => console.log('ADD_IMAGE not implemented')}>Add</ButtonPrimary>
          <ButtonDefault onClick={resetImages}>Reset Images</ButtonDefault>
          {/* TODO shuffle images button*/}
        </div>
        <div className='flex-row'>
          <FlipMove duration={450} easing='ease-out' typeName='div'>
            {images.map((url, index) => (
              <Image
                key={url}
                url={url}
                selectImage={() => selectImage(index)}
                removeImage={() => console.log('TODO removeImage')}
                isSelected={selectedImage === index} />
            ))}
          </FlipMove>
          <Img
            key={images[selectedImage]}
            src={images[selectedImage]}
            className='selected-item' />
        </div>
      </div>
    );
  }
}

ImageGallery.propTypes = {
  selectImage: func,
  selectedImage: number,
  images: arrayOf(string),
  resetImages: func,
  /* TODO
  * removeImage
  * addImage
  * shuffleImages*/
};

/* state is redux store state*/
const mapStateToProps = state => ({
  selectedImage: state.image.selectedImage,
  images: state.image.images,
});
const mapDispatchToProps = ({
  selectImage: index => dispatch => dispatch({ type: 'SELECT_IMAGE', payload: index, }),
  removeImage: index => dispatch => dispatch({ type: 'REMOVE_IMAGE', payload: index, }),
  resetImages: () => dispatch => dispatch({ type: 'RESET_IMAGES', }),
  /* addImage ...
  * shuffleImages ...
  * */
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageGallery);
