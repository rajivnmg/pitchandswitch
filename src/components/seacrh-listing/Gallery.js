import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import axios from 'axios';	
const constant = require('../../config/constant')
const PREFIX_URL = constant.BASE_IMAGE_URL+'Products/';
var basicIMG = `${constant.BASE_IMAGE_URL}`; 
class ThumbGallery extends React.Component {

  constructor(props) {
    super(props);   
    this.state = {
      showIndex: false,
      showBullets: false,
      infinite: true,
      showThumbnails: true,
      showFullscreenButton: false,
      showGalleryFullscreenButton: false,
      showPlayButton: false,
      showGalleryPlayButton: true,
      showNav: false,
      isRTL: false,
      slideDuration: 450,
      slideInterval: 2000,
      thumbnailPosition: 'bottom',
      showVideo: {},
      resultData: "",
      mainImages: "default_product_img@3x.png",
      productImagesResult:[],
      imageLoaded : false     
    };
   
  }
  
 
  componentWillMount(){		
	  
	  this.images = [
			  {
				//original: basicIMG+this.state.mainImages,
				original: basicIMG+'Products/'+this.props.galleriesImg,
				thumbnail: basicIMG+'Products/'+this.props.galleriesImg,
			  },
			  //~ {
				//~ original: `${constant.BASE_IMAGE_URL}default_product_img@3x.png`,
				//~ thumbnail: `${constant.BASE_IMAGE_URL}default_product_img@3x.png`,
				//~ originalClass: 'featured-slide',
				//~ thumbnailClass: 'featured-thumb'      
			  //~ },
			].concat(this._getStaticImages());
			
	}  
  componentDidMount(){	
	  let imgD = '' 	  	  
		axios.all([
			axios.get('/product/productDetails/'+ this.props.galleriesID),
			axios.get('/product/productImages/'+ this.props.galleriesID)
		]).then(axios.spread((results, resultsImg) => {
			this.setState({mainImages:results.data.result?results.data.result.productImages[0]:"",imageLoaded:true,productImagesResult:resultsImg.data.result}, () => {console.log('IIIIII', resultsImg.data.result)});			
			resultsImg.data.result.map((img) => {
				console.log("img",img)
				this.images.push({
				original: basicIMG+'Products/'+img.imageName,
				thumbnail:basicIMG+'Products/'+img.imageName
				})
			});
				
		}))
		//.then(response => this.setState({ vehicles: response.data }))
		.catch(error => console.log(error));
	}
  
  
   componentDidUpdate(prevProps, prevState) {
    if (this.state.slideInterval !== prevState.slideInterval ||
        this.state.slideDuration !== prevState.slideDuration) {
        this._imageGallery.pause();
        this._imageGallery.play();
    }
   }

  _onImageClick(event) {
    console.debug('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex());
  }

  _onImageLoad(event) {
    console.debug('loaded image', event.target.src);
  }

  _onSlide(index) {
    this._resetVideo();
    console.debug('slid to index', index);
  }

  _onPause(index) {
    console.debug('paused on index', index);
  }

  _onScreenChange(fullScreenElement) {
    console.debug('isFullScreen?', !!fullScreenElement);
  }

  _onPlay(index) {
    console.debug('playing from index', index);
  }

  _handleInputChange(state, event) {
    this.setState({[state]: event.target.value});
  }

  _handleCheckboxChange(state, event) {
    this.setState({[state]: event.target.checked});
  }

  _handleThumbnailPositionChange(event) {
    this.setState({thumbnailPosition: event.target.value});
  }

  _getStaticImages() {
     let images = []; 
     //~ for (let i = 2; i < 3; i++) {
      //~ images.push({
        //~ original: `${PREFIX_URL}${i}.jpg`,
        //~ thumbnail:`${PREFIX_URL}${i}.jpg`
      //~ });
    //~ }

    return images;
  }

  _resetVideo() {
    this.setState({showVideo: {}});

    if (this.state.showPlayButton) {
      this.setState({showGalleryPlayButton: true});
    }

    if (this.state.showFullscreenButton) {
      this.setState({showGalleryFullscreenButton: true});
    }
  }

  _toggleShowVideo(url) {
    this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
    this.setState({
      showVideo: this.state.showVideo
    });

    if (this.state.showVideo[url]) {
      if (this.state.showPlayButton) {
        this.setState({showGalleryPlayButton: false});
      }

      if (this.state.showFullscreenButton) {
        this.setState({showGalleryFullscreenButton: false});
      }
    }
  }

  _renderVideo(item) {
    return (
      <div className='image-gallery-image'>
        {
          this.state.showVideo[item.embedUrl] ?
            <div className='video-wrapper'>
                <a
                  className='close-video'
                  onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
                >
                </a>
                <iframe
                  width='560'
                  height='315'
                  src={item.embedUrl}
                  frameBorder='0'
                  allowFullScreen
                >
                </iframe>
            </div>
          :
            <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
              <div className='play-button'></div>
              <img src={item.original}/>
              {
                item.description &&
                  <span
                    className='image-gallery-description'
                    style={{right: '0', left: 'initial'}}
                  >
                    {item.description}
                  </span>
              }
            </a>
        }
      </div>
    );
  }

  render() {
    return (

      <section className='app'>
        <ImageGallery
          ref={i => this._imageGallery = i}
          items={this.images}
          lazyLoad={false}
          onClick={this._onImageClick.bind(this)}
          onImageLoad={this._onImageLoad}
          onSlide={this._onSlide.bind(this)}
          onPause={this._onPause.bind(this)}
          onScreenChange={this._onScreenChange.bind(this)}
          onPlay={this._onPlay.bind(this)}
          infinite={this.state.infinite}
          showBullets={this.state.showBullets}
          showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
          showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton}
          showThumbnails={this.state.showThumbnails}
          showIndex={this.state.showIndex}
          showNav={this.state.showNav}
          isRTL={this.state.isRTL}
          thumbnailPosition={this.state.thumbnailPosition}
          slideDuration={parseInt(this.state.slideDuration)}
          slideInterval={parseInt(this.state.slideInterval)}
          additionalClass="app-image-gallery"
        /> 
      </section>
    );
  }
}
export default ThumbGallery;
