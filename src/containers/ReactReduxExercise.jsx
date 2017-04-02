import React from 'react';
import { connect, } from 'react-redux';
import FlipMove from 'react-flip-move';

const { func, string, bool, arrayOf, } = React.PropTypes;

class Image extends React.Component {

  render() {
    const { url, removeImage, selectImage, isSelected, } = this.props;
    return (<div key={url} className="thump-nail-list-item">
      <div className="image-action-container">
        <button className="centered-foreground-item button-warning " onClick={() => removeImage(url)}>Remove</button>
        <button className="centered-foreground-item button-primary" onClick={() => selectImage(url)}>Select</button>
      </div>
      <img
        src={url}
        role="presentation"
        className={isSelected ? 'url-thump-nail-selected' : 'url-thump-nail'}
      />
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

  state = { inputValue: '', };

  render() {
    const { selectImage, selectedImage, images, resetImages, } = this.props;
    return (
      <div>
        <div className="flex-row">
          <input
            className="input-default"
            type="text"
            placeholder="image url"
            value={this.state.inputValue}
            onChange={e => this.setState({ inputValue: e.target.value, })}
          />
          <button className="button-primary" onClick={() => console.log('ADD_IMAGE not implemented')}>Add</button>
          <button className="button-default" onClick={resetImages}>Reset Images</button>
          {/* TODO shuffle images button*/}
        </div>
        <div className="flex-row">
          <FlipMove duration={450} easing="ease-out" typeName="div">
            {images.map(url => (<Image key={url} url={url} selectImage={selectImage} removeImage={() => console.log('TODO removeImage')} isSelected={selectedImage === url} />))}
          </FlipMove>
          <img key={selectedImage} role="presentation" src={selectedImage} className="selected-item" />
        </div>
      </div>
    );
  }
}

ImageGallery.propTypes = {
  selectImage: func,
  selectedImage: string,
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
  selectImage: url => dispatch => dispatch({ type: 'SELECT_IMAGE', payload: url, }),
  removeImage: url => dispatch => dispatch({ type: 'REMOVE_IMAGE', payload: url, }),
  resetImages: () => dispatch => dispatch({ type: 'RESET_IMAGES', }),
  /* addImage ...
  * shuffleImages ...
  * */
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageGallery);
