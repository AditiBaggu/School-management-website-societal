import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import { Modal } from "antd";
import "./DeletePicture.css";
import { AuthContext } from "../../Shared/Context/Auth-context";

const DeletePicture = () => {
    const auth = useContext(AuthContext);
  const [loadedImages, setLoadedImages] = useState([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:4444/api/gallery/get"
        );
        setLoadedImages(responseData.images);
      } catch (err) {}
    };
    fetchImages();
  }, [sendRequest]);

  const deleteImage = async () => {
    try {
      await sendRequest(
        `http://localhost:4444/api/gallery/delete/${imageToDelete._id}`,
        "DELETE",
        null,
        {Authorization:"Bearer "+auth.token}
      );
      setLoadedImages((prevImages) =>
        prevImages.filter((image) => image._id !== imageToDelete._id)
      );
      closeModal();
    } catch (err) {}
  };

  const openModal = (image) => {
    setImageToDelete(image);
    setIsDeleteModalVisible(true);
  };

  const closeModal = () => {
    setIsDeleteModalVisible(false);
    setImageToDelete(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedImages && (
        <div className="deletePicture-list">
          {loadedImages.map((image) => (
            <div className="deletePicture-card" key={image._id}>
               <img src={`http://localhost:4444/${image.image}` } alt={image._id} width="100%" />
              
              <button onClick={() => openModal(image)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      <Modal
        visible={isDeleteModalVisible}
        onCancel={closeModal}
        onOk={deleteImage}
        okText="Yes"
        cancelText="No"
        
      >
        <p>Are you sure you want to delete this student?</p>
      </Modal>
    </React.Fragment>
  );
};

export default DeletePicture;
