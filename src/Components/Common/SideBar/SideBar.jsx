import React, { useState } from "react";
import styles from "./sidebar.module.css";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ImHome } from "react-icons/im";
import { FaUsers } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { BsFillFileZipFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { FaUserInjured } from "react-icons/fa";
import { TfiMenuAlt } from "react-icons/tfi";
import { FaUserAlt } from "react-icons/fa";
import Header from "../Header/Header";

function SideBar(props) {
  const { path, title } = props;

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  // const width2 = () => { isOpen ? '100px' : '240px' }

  const sendDataToParent = () => {
    const data = isOpen ? '240px' : '100px'
    props.sendDataToParent(data);
  };


  const getColor = () => {
    return 'white'
  }
  const getColor2 = () => {
    return 'red'
  }

  // console.log(path)

  const user = JSON.parse(localStorage.getItem("user2"));
  const id = user.data[0].id;
  const role = user.data[0].role;

  return (
    <>
      <Header width={isOpen ? '100px' : '240px'} />

      <div className={styles.navItems} style={{ width: isOpen ? '100px' : '240px' }}>

        <h3><TfiMenuAlt className={styles.hover} onClick={
          () => {
            toggle()
            sendDataToParent()
          }
        } /></h3>

        <ul>

          <Link to="/dashboard" style={{ textDecoration: "none" }} >
            <li style={path == "/dashboard" ? { backgroundColor: 'white', color: '#212b36', textDecoration: 'none', borderRadius: '5px 0px 0px 5px' } : { textDecoration: 'none' }}>
              <span> <FaHome ></FaHome> </span>
              <p style={{ display: isOpen ? "none" : "block", transition: '1.5s' }}>Home</p>
            </li>
          </Link>

          {role === 'admin' ?
            <>
              <Link to="/Employees_Registration" style={{ textDecoration: "none" }} >
                <li style={path == "/employee" ? { backgroundColor: 'white', color: '#212b36', textDecoration: 'none', borderRadius: '5px 0px 0px 5px' } : { textDecoration: 'none' }}>
                  <span>
                    <FaUsers></FaUsers>
                  </span>
                  <p style={{ display: isOpen ? "none" : "block", transition: '0.5s' }}>Employees</p>
                </li>
              </Link>

              <Link to="/project" style={{ textDecoration: "none" }} >
                <li style={path == "/project" ? { backgroundColor: 'white', color: '#212b36', textDecoration: 'none', borderRadius: '5px 0px 0px 5px' } : { textDecoration: 'none' }}>
                  <span>
                    <BsFillFileZipFill></BsFillFileZipFill>
                  </span>
                  <p style={{ display: isOpen ? "none" : "block", transition: '0.5s' }}>Project</p>
                </li>
              </Link>
            </>
            : ''}

          {role === 'user' ?

            <Link to="/Eproject" style={{ textDecoration: "none" }} >
              <li style={path == "/project" ? { backgroundColor: 'white', color: '#212b36', textDecoration: 'none', borderRadius: '5px 0px 0px 5px' } : { textDecoration: 'none' }}>
                <span>
                  <BsFillFileZipFill></BsFillFileZipFill>
                </span>
                <p style={{ display: isOpen ? "none" : "block", transition: '0.5s' }}>Project</p>
              </li> 
            </Link> 

            : ''}


          <li> 
            <span>
              <AiFillSetting></AiFillSetting>
            </span>
            <p style={{ display: isOpen ? "none" : "block", transition: '0.5s' }}>Settings</p>
          </li>
          <li>
            <span>
              <FaUserAlt></FaUserAlt>
            </span>
            <p style={{ display: isOpen ? "none" : "block", transition: '0.5s' }}>Profile</p>
          </li>
          <li onClick={handleLogout}>
            <span>
              <BiLogOut></BiLogOut>
            </span>
            <p style={{ display: isOpen ? "none" : "block", transition: '0.5s' }}> Logout</p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideBar;
