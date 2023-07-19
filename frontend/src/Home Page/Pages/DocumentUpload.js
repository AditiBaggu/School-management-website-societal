import React, { useState, useEffect } from 'react';
import { Upload, Button, List, Typography, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import './DocumentUpload.css';
import { useHttpClient } from '../../Shared/Hooks/http-hook';

const { Title } = Typography;

const DocumentUpload = () => {
  const { sendRequest } = useHttpClient();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:4444/api/joshua/document/studymaterial/files',
          'GET'
        );
        setDocuments(responseData.files);
      } catch (err) {
        // Handle error
        message.error('Failed to fetch documents');
      }
    };

    fetchDocuments();
  }, [sendRequest]);

  const handleUpload = async (file) => {
    // Create a new FormData object
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Send the file to the backend
      const responseData = await sendRequest(
        'http://localhost:4444/api/joshua/document/studymaterial/add',
        'POST',
        formData
      );

      // Add the uploaded file to the documents list
      setDocuments([...documents, responseData.file]);
      message.success('File uploaded successfully');
    } catch (err) {
      // Handle error
      message.error('File upload failed');
    }
  };

  const handleDelete = async (file) => {
    // Remove deleted file from the documents list
    const updatedDocuments = documents.filter((doc) => doc._id !== file._id);
    setDocuments(updatedDocuments);

    try {
      // Delete the file from the backend
      await sendRequest(
        `http://localhost:4444/api/joshua/document/studymaterial/files/${file._id}`,
        'DELETE'
      );
      message.success('File deleted successfully');
    } catch (err) {
      // Handle error
      message.error('File deletion failed');
    }
  };

  const openDocument = (file) => {
    const link = document.createElement('a');
    link.href = file.file;
    link.download = file.name;
    link.click();
  };

  const renderUploadList = () => {
    return (
      <List
        dataSource={documents}
        grid={{ gutter: 16, column: 4 }}
        renderItem={(file) => (
          <List.Item>
            <div className="document-box">
              <div className="document-heading">{file.name}</div>
              <div className="document-actions">
                <Button
                  type="primary"
                  icon={<DeleteOutlined />}
                  shape="circle"
                  onClick={() => handleDelete(file)}
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  shape="circle"
                  onClick={() => openDocument(file)}
                />
              </div>
            </div>
          </List.Item>
        )}
      />
    );
  };

  return (
    <div>
      <Upload.Dragger
        beforeUpload={() => false}
        fileList={[]}
        onChange={({ file }) => handleUpload(file)}
      >
        <p className="ant-upload-drag-icon">
          <PlusOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag files to this area to upload
        </p>
      </Upload.Dragger>

      <div className="upload-list">{renderUploadList()}</div>
    </div>
  );
};

export default DocumentUpload;
