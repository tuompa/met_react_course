import React from 'react';
import Img from './Img';
import whiteCollar from '../images/business-cat-white-collar-tie.jpg';
import candidate from '../images/cat-candidate.jpg';
import grumpy from '../images/grumpy.jpg';
import {keys,} from '../utils';


/* make images pop up with animation when they are added,
 and fadeout when removed*/
/* can you find any weaknesses in this implementation? */
const {string,object,} = React.PropTypes;

/*
takes: {[imgName] : src, [img2Name]: src2, ...}
produces: {[imgName]: {src: 'url/path', isRemoved:bool}, [img2Name]: ...}
*/

const mapNewImages = images=>keys(images)
    .reduce((acc,k)=>{
      acc[k] = {src: images[k],isRemoved: false,};
      return acc;
    },{});

class AnimateImageList extends React.Component {

  static propTypes ={
    images: object.isRequired,
  }

  state = {/*   example shape of state
    images: {
      {[imgName]: {
        src: 'url/path',
        isRemoved:false
      }, [img2Name]: ...
    }*/
  }

  // Set the initial images before component mount
  componentWillMount() {
    // shallow copy props images
    let {...propsImages} = this.props.images;
    const images = mapNewImages(propsImages);
    this.setState({images,});
  }

  /*
  1. check which images are removed
  2. set their state is removed so that correct
  className with correct animation will be displayed
  3. set timeout for removing the image after animation has finished
  4. produce next state
  */
  componentWillReceiveProps({images,}) {
    const existingImages = mapNewImages(images);
    const currentImages = this.state.images;
    /*
    1. find out which images have been removed
    const removedKeys = ... */

    /*
    2. to get the right css className set (for animation)
    set every removed images 'isRemoved' to true,
    !(but do not delete it from state
    and remember not to mutate the current state directly)
    const fadeOutImages = ...
    */

    /*
    3. set timeout to remove images from state after animation
     */

    /*
    4. produce next state
    */
  }

  componentWillUnmount() {
    // clear any possible timeouts
    keys(this).filter(k=>k.contains('imgRemoval'))
      .forEach(k=>this[k].clearTimeout(k));
  }

  setTimeoutToRemoveImage(key) {
    // remove image after 0.4seconds
    this[`imgRemoval${key}`] = setTimeout(()=>{
      // take shallow copy of images
      const {...images} = this.state.images;
      delete images[key];
      this.setState({images,});
    },390);
  }

  render() {
    const {images,} = this.state;
    return (
      <div className="centering-flex">
        {keys(images)
          .sort((k1,k2)=>k1<k2)
          .map(k=>(
            <Img
              key={k}
              src={images[k].src}
              className={images[k].isRemoved ? 'image-shrink-out' : 'image-pop-up'}
            />
          ))}
      </div>
    );
  }
}


const cvPicks= {whiteCollar,candidate,grumpy,};
export default class ImageList extends React.Component {

  state = {images: cvPicks,};

  toggleImage(name) {
    const {...images} = this.state.images;
    if (images[name]) {
      delete images[name];
    } else {
      images[name] = cvPicks[name];
    }
    this.setState({images,});
  }

  render() {
    const {images,} = this.state;
    return (
      <div className="note-exercise-m">
        <div className="centering-flex">
          {['whiteCollar','grumpy','candidate',]
          .map(name=>(
            <button
              key={name}
              className={images[name] ? 'button-warning' : 'button-primary'}
              onClick={()=>this.toggleImage(name)}
            >{name}</button>
            )
          )}
        </div>
        <div className="centering-flex">
          <AnimateImageList images={this.state.images}/>
        </div>
      </div>
    );
  }
}
