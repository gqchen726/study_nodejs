import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from "react";
import PropTypes from "prop-types";

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
    handleRemove = () => {

    }

    handleChange = ({ fileList }) => {
        console.log(fileList)


        this.setState({fileList});
        // let {fileList} = this.state;
        this.props.getFileList(fileList);
    }

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const { action,isEditMode } = this.props;

        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
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