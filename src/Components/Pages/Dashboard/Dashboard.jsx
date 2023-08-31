import React from "react";
import styles from "./manager.module.css";
import { AiFillCar } from "react-icons/ai";
import { RiGpsFill } from "react-icons/ri";
import { MdMonitor } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { HiBellAlert } from "react-icons/hi2";
import { HiDocumentReport } from "react-icons/hi";
import { FaRegIdCard } from 'react-icons/fa';
import { BiTrip } from "react-icons/bi";
import { BsFillChatDotsFill } from "react-icons/bs";
import { ImUserTie } from "react-icons/im";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BsFillFileZipFill } from "react-icons/bs";
import { FcApproval } from "react-icons/fc";
import { HiDocumentCheck } from "react-icons/hi2";
import { useState, useEffect } from 'react';
import Axios from "axios"
import axios from 'axios';
import SideBar from "../../Common/SideBar/SideBar";
// import swal from "sweetalert";

const Dashboard = () => {

    const user = JSON.parse(localStorage.getItem("user2"));
    const id = user.data[0].id;
    const role = user.data[0].role;
    console.log(role);


    const [dataSource, setDataSource] = useState([])
    const loddata = async () => {
        const response = await axios.get("http://localhost:3006/api/employee")
        setDataSource(response.data);
    }
    useEffect(() => {
        loddata()
    }, []);

    const [dataSource2, setDataSource2] = useState([])
    const loddata2 = async () => {
        const response = await axios.get("http://localhost:3006/api/insert")
        setDataSource2(response.data);
    }
    useEffect(() => {
        loddata2()
    }, []);

    const [dataSource3, setDataSource3] = useState([])
    const loddata3 = async () => {
        const response = await axios.get(`http://localhost:3006/api/employee/project/${id}`);
        setDataSource3(response.data);
    }
    useEffect(() => {
        loddata3()
    }, []);

    const [dataSource4, setDataSource4] = useState([])
    const loddata4 = async () => {
        const response = await axios.get(`http://localhost:3006/api/employee/project/${id}`);
        setDataSource4(response.data);
    }
    useEffect(() => {
        loddata4()
    }, []);

    const [dataSource5, setDataSource5] = useState([])
    const loddata5 = async () => {
        const response = await axios.get(`http://localhost:3006/api/employee/actionplan/${id}`);
        setDataSource5(response.data);
        // setDataSource5(response.data.length)
    }
    useEffect(() => {
        loddata5()
    }, []);

    const [dataSource6, setDataSource6] = useState([])
    const loddata6 = async () => {
        const response = await axios.get("http://localhost:3006/api/actionplan")
        setDataSource6(response.data);
    }
    useEffect(() => {
        loddata6()
    }, []);


    const [width, setWidth] = useState();

    const handleDataFromChild = (data) => {
        setWidth(data);
    };

    return (
        <>
            <SideBar path="/dashboard" title="Manager Dashboard" sendDataToParent={handleDataFromChild} />


            <div className={styles.dashboard} style={{ marginLeft: `${width}`, width: `calc(100% - ${width})` }}>

                <div className={styles.dashboardContents}>
                    {role === "admin" ?
                        <>
                            <Link to="/Employees_Registration" style={{ textDecoration: "none" }}>
                                <div className={styles.card}>
                                    <p>Employees </p>
                                    <div style={{ display: "flex", justifyContent: "center", gap: "5%", }}>
                                        <label><FaUsers></FaUsers></label>
                                        <label style={{ display: "flex", fontSize: "21px", marginTop: "8px", }}>{dataSource.length}</label>
                                    </div>
                                </div>
                            </Link>

                            <Link to="/project" style={{ textDecoration: "none" }}>
                                <div className={styles.card}>
                                    <p>Project </p>
                                    <div style={{ display: "flex", justifyContent: "center", gap: "5%", }}>
                                        <label><BsFillFileZipFill></BsFillFileZipFill></label>
                                        <label style={{ display: "flex", fontSize: "21px", marginTop: "8px", }}>{dataSource2.length}</label>
                                    </div>
                                </div>
                            </Link>

                            <Link to="/ActionPlan" style={{ textDecoration: "none" }}>
                                <div className={styles.card}>
                                    <p>Action Plan </p>
                                    <div style={{ display: "flex", justifyContent: "center", gap: "5%", }}>
                                        <label><HiDocumentCheck></HiDocumentCheck></label>
                                        <label style={{ display: "flex", fontSize: "21px", marginTop: "8px", }}>{dataSource6.length}</label>
                                    </div>
                                </div>
                            </Link>
                        </>
                        : ""}
                    {role === "user" ?
                        <>
                            <Link to="/Eproject" style={{ textDecoration: "none", }}>
                                <div className={styles.card}>
                                    <p>Projects </p>
                                    <div style={{ display: "flex", justifyContent: "center", gap: "5%", }}>
                                        <label><BsFillFileZipFill></BsFillFileZipFill></label>
                                        <label style={{ display: "flex", fontSize: "21px", marginTop: "8px", }}>{dataSource4.length}</label>
                                    </div>
                                </div>
                            </Link>

                            <Link to="/ProgressReport" style={{ textDecoration: "none", }}>
                                <div className={styles.card}>
                                    <p>Progress Report </p>
                                    <div style={{ display: "flex", justifyContent: "center", gap: "5%", }}>
                                        <label><BsFillFileZipFill></BsFillFileZipFill></label>
                                        <label style={{ display: "flex", fontSize: "21px", marginTop: "8px", }}>{dataSource5.length}</label>
                                    </div>
                                </div>
                            </Link>

                        </>
                        : ""}


                    {/*


                    <div className={styles.users}>
                        <Link to="/employees" style={{ textDecoration: "none" }}>
                            <h4>Employees</h4>
                            <div className={styles.innerCard3}>
                                <BsFillFileZipFill size="2.5rem" color="#002e4d"></BsFillFileZipFill>
                                <p> {dataSource2.length} </p>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.tracking}>
                        <Link to="/project" style={{ textDecoration: "none" }}>
                            <h4>Projects </h4>
                            <div className={styles.innerCard8}>
                                <BsFillFileZipFill size="2.2rem"></BsFillFileZipFill>
                                <p> {dataSource.length} </p>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.registration}>
                        <Link to="/ActionPlan" style={{ textDecoration: 'none' }} >
                            <h4>Approvals </h4>
                            <div className={styles.innerCard4}>
                                <HiDocumentCheck size="2.4rem" ></HiDocumentCheck>
                            </div>
                        </Link>
                    </div> */}


                </div>
            </div>
        </>
    );
}
export default Dashboard;
