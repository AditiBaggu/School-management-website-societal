import React, { useEffect, useState } from 'react';
import { Card, Avatar, List, Modal } from 'antd';
import './About.css';
import { useHttpClient } from '../../Shared/Hooks/http-hook';
import LoadingSpinner from '../../Shared/Components/UIElements/LoadingSpinner';

const { Meta } = Card;

const About = () => {
  const facultyData = [
    {
      id: 1,
      name: 'Jashwanth Sir',
      designation: 'Professor',
      department: 'Computer Science',
      avatar: 'https://example.com/avatar1.png',
      description: 'Machine learning',
    },
    {
      id: 2,
      name: 'Kiran Sir',
      designation: 'Dean',
      department: 'Electrical Engineering',
      avatar: 'https://example.com/avatar2.png',
      description: 'Neural Networks',
    },
    // Add more faculty as needed
  ];

  //const [facultyData, setFacultyData] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  


  const handleCardClick = (faculty) => {
    setSelectedFaculty(faculty);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedFaculty(null);
    setIsModalVisible(false);
  };


  const [loadedDetails, setLoadedDetails] = useState(null);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:4444/api/joshua/authentication/teacher/get/allteachers"
        );
        setLoadedDetails(responseData.teachers);
      } catch (err) {
        // Handle error
      }
    };

    fetchDetails();
  }, [sendRequest]);

  if (isLoading || !loadedDetails) {
    return <div><center><LoadingSpinner /></center></div>; // Add a loading state or spinner while data is being fetched
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Display error message if fetch request fails
  }

  

  return (
    <div className="faculty-directory-container">
      <h1>Faculty Directory</h1>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        dataSource={loadedDetails}
        renderItem={(faculty) => (
          <List.Item>
            <Card
              onClick={() => handleCardClick(faculty)}
              className="faculty-card"
            >
              <Meta
                avatar={<Avatar src={`http://localhost:4444/${faculty.image}`} size={120} />}
                title={faculty.name}
                description={faculty.qualification}
              />
            </Card>
          </List.Item>
        )}
      />
      <Modal
        visible={isModalVisible}
        title={selectedFaculty?.name}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedFaculty && (
          <div className="faculty-modal-content">
            <Avatar src={`http://localhost:4444/${selectedFaculty.image}`} size={120} />
            <h2>{selectedFaculty.qualification}</h2>
            <p>{selectedFaculty.subjects}</p>
            
          </div>
        )}
      </Modal>
    </div>
  );
};

export default About;