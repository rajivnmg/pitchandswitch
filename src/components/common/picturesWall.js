import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Upload, Icon, Modal }  from 'antd';
import ImgCrop from 'antd-img-crop';
import moment from 'moment';
import './picturesWall.css';
import axios from 'axios';
// import 'antd/dist/antd.css';
const constant = require("../../config/constant");
class PicturesWall extends React.Component {
	constructor(props){
		super(props);
		  this.state = {
			previewVisible: false,
			previewImage: '',
			fileList:(this.props.fileList)?this.props.fileList:[],
		  };
}
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  //handleChange = ({ fileList }) => this.setState({ fileList })
	handleChange = ({ fileList }) => {
		this.setState({ fileList })
		this.props.onHandlePicture(fileList);
	}
	handleRemove = (file) => {
		axios.delete('/product/deleteProductImage/'+file.uid).then(result =>{
				console.log('handleRemove', file);
		})
		
	};

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
      <ImgCrop>
        <Upload
          action={constant.BASE_SERVER_URL+"/product/tepmUpload/"}
          listType="picture-card"
          fileList={this.state.fileList}
          multiple={false}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        </ImgCrop>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
export default PicturesWall;
