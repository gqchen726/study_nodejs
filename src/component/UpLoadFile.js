import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import { urlsUtil } from '../public/ApiUrls/UrlsUtil';
import {util} from "./../common/Util"

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export class UpLoadFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: props.fileList?props.fileList:[],
            oldFileList: props.fileList?props.fileList:[],
        };
    }


    handleCancel = () => {
        this.setState({ previewVisible: false });
    }

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };


    handleRemove = (e) => {
        axios.get(`${urlsUtil.image.delete}?fileName=${e.name}`).then((response) => {
            let responseBody = response.data;
            if (responseBody.code === 1) {
                this.setState({
                    fileList : this.state.fileList.unshift(e)
                })
            } else {
                util.tipMessage('delete info tips',responseBody.message)
            }
        }).catch((error) => {
            util.tipMessage('delete info tips',error.toString())
        });
    }

    handleChange = ({ fileList }) => {
        this.setState({fileList});
        this.props.getFileList(fileList);
    }

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const { action,isEditMode } = this.props;

        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 16 }}>Upload</div>
            </div>
        );
        return (
            <>
                <Upload
                    action={action}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    onRemove={this.handleRemove}
                    disable={isEditMode}
                >
                    {fileList.length >= this.props.maxLength ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}
UpLoadFile.propTypes = {
    action: PropTypes.string,
    isEditMode: PropTypes.bool,
    getFileList: PropTypes.func,
    maxLength: PropTypes.number
}