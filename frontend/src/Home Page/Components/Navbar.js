import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { NavLink } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { AuthContext } from "../../Shared/Context/Auth-context";
import image from "../Components/images/White Wifi Icon Computer Logo.png"
import { useHttpClient } from "../../Shared/Hooks/http-hook";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";

function Navbar() {
  const [click, setClick] = useState(false);
  const auth = useContext(AuthContext);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const handleLogout = () => {
    console.log("hi")
    if (window.confirm("Are you sure you want to logout?")) {
      auth.logout();
    }
  };

  let menuOptions = [];
  if (auth.isLoggedIn) {
    menuOptions = [
      
      { label: "Admin", link: "/admin" },
      { label: "Log-Out", onClick:()=> auth.logout },
      { label: "Study Material", link: "/Studymaterials" },
      { label: "Attendance", link: "/AttendanceClass" },
      { label: "Document upload", link: "/DocumentUpload" },
      { label: "Grades", link: "/GradingClass" },
      { label: "Performance", link: "/PerformanceClass" },
    ];
  } else {
    menuOptions = [
      { label: "Admin Login", link: "/adminLogin" },
      { label: "Teacher Login", link: "/TeacherLogin" },
      { label: "Signup", link: "/signup" },
      { label: "Study Material", link: "/Studymaterials" },
    ];
  }

  const menu = (
    <Menu>
      {menuOptions.map((option) => (
        <Menu.Item key={option.link}>
          <Link to={option.link}>{option.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
  const [loadedDetails, setLoadedDetails] = useState(null);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:4444/api/joshua/details"
        );
        setLoadedDetails(responseData.details[0]);
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

  const {  image } = loadedDetails;
  

  return (
    <div>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="/Home" className="navbar-logo" onClick={closeMobileMenu}>
              <img src={`http://localhost:4444/${image}`} height="90%" />
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/Admission"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Admission
                </NavLink>
              </li>
              <li className="nav-item">
                <Dropdown overlay={menu} trigger={["click"]}>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="nav-links">More</span>
                    <DownOutlined />
                  </a>
                </Dropdown>
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default Navbar;
