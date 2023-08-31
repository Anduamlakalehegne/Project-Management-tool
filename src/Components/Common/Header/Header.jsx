import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import { FaUserAlt } from "react-icons/fa";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import 'animate.css';

const Header = ({ width }) => {
  const [loginID, setLoginID] = useState(null);

  const [state, setState] = useState(false);
  const [action, setAction] = useState(true);

  const [toggles, setToggle] = useState("All_navigation");
  const showMenu = () => {
    setToggle("All_navigation active");
    setAction(!action)
  }
  const hideMenu = () => {
    setToggle("All_navigation");
    setAction(!action)
  }

  const toggle = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      html: (
        <>
          <p ><img className={styles.popImg} src="https://unsplash.it/400/200" /></p>
          <p style={{ color: 'f09053', paddingBottom: "5px" }} >ID  : {id}</p>
          <p style={{ color: 'f09053', paddingBottom: "5px" }} >Name  : {name}</p>
          <p style={{ color: 'f09053', paddingBottom: "5px" }} >Role  : {role}</p>
          <p style={{ color: 'f09053', paddingBottom: "5px" }} >Email  : {email}</p>

        </>
      ),
      position: 'top-end',
      showConfirmButton: false,
      showDenyButton: true,
      width: "300px",
      denyButtonText: 'Logout',
      // denyButtonColor: "#e24f00",
      imageClass: 'img-responsive',
      imageAlt: 'Custom image',
    }).then((result) => {
      if (result.isDenied) {
        handleClickopen2()
      }
    });
  };

  const remove = () => {
    localStorage.removeItem("user2");
    window.location.href = "/";
  }

  const handleClickopen2 = () => {
    Swal.fire({
      text: "Are you sure You Want to Logout",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00cc44',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok!',
      showCloseButton: true,
      showClass: {
        popup: 'animate__animated animate__shakeX'
      },

    }).then((result) => {
      if (result.isConfirmed) {
        remove()
        // window.location.href = "/";
      }
    })


  }
  const user = JSON.parse(localStorage.getItem("user2"));
  const id = user.data[0].id;
  const role = user.data[0].role;
  const email = user.data[0].employeeEmail;
  const name = user.data[0].employeeName;


  return (
    <>
      <div className={styles.container} style={{ marginLeft: `${width}`, width1: '100%' }}>
        <div className={styles.header}>
          <p style={{ color: 'white', fontSize: '1.5vw', padding: '20px' }}>
            Project Management Tool
          </p>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Info</li>
            <li className={styles.login}>
              <label> <FaUserAlt size="20px"></FaUserAlt></label>
              <label className={styles.User} >{role}</label>
              <label onClick={() => { toggle() }}> <IoIosArrowDropdownCircle className={styles.icon}></IoIosArrowDropdownCircle></label>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
