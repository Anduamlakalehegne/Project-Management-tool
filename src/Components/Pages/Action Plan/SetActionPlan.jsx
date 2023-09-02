import React from 'react'
import styles from "./setActionPlan.module.css";
import { BsSearch } from "react-icons/bs";
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import swal from "sweetalert";
import withReactContent from 'sweetalert2-react-content'
import 'animate.css';
import Axios from "axios"
import axios from 'axios';
import { Pagination } from 'antd';
import { Link, useParams } from 'react-router-dom';
import SideBar from '../../Common/SideBar/SideBar';

export default function SetActionPlan() {

    const { projectId, projectStartDate, projectEndDate } = useParams();
    const user = JSON.parse(localStorage.getItem("user2"));
    const employeeId = user.data[0].id;
    const role = user.data[0].role;
    const email = user.data[0].employeeEmail;
    const name = user.data[0].employeeName;

    // const [projectStartDate, setProjectStartDate] = useState("");
    // const [projectEndDate, setProjectEndDate] = useState("");
    const [documentationStartDate, setDocumentationStartDate] = useState("");
    const [documentationEndDate, setDocumentationEndDate] = useState("");
    const [databasStartDate, setDatabasStartDate] = useState("");
    const [databasEndDate, setDatabasEndDate] = useState("");
    const [codeStartDate, setCodeStartDate] = useState("");
    const [codeEndDate, setCodeEndDate] = useState("");
    const [testStartDate, setTestStartDate] = useState("");
    const [testEndDate, setTestEndDate] = useState("");
    const [deployStartDate, setDeployStartDate] = useState("");
    const [deployEndDate, setDeployEndDate] = useState("");
    const [dataSource, setDataSource] = useState([])
    const [totalPages, setTotalPage] = useState(1);

    const [page, setCurentPage] = useState(1);
    const [postPerPage, setpostPerPage] = useState(5);
    const indexOfLastPage = page * postPerPage;
    const indexOfFirstPage = indexOfLastPage - postPerPage;
    const currentPage = dataSource.slice(indexOfFirstPage, indexOfLastPage);

    const onShowSizeChange = (current, pageSize) => {
        setpostPerPage(pageSize);
    }

    const getColor = (approval) => {
        if (approval == "Pending") {
            return styles.pendingButton
        }
        if (approval == "Approved") {
            return styles.approveButton
        }
        if (approval == "Declined") {
            return styles.declineButton
        }
    }

    const loddata = async () => {
        const response = await axios.get("http://localhost:3006/api/actionplan")
        setDataSource(response.data);

    }
    useEffect(() => {
        loddata()
    }, []);

    const addProjects = () => {
        if (!projectStartDate || !projectEndDate) {
            Swal.fire({
                icon: 'error',
                text: "Please Fill All Information",
                // showCancelButton: true,
                confirmButtonColor: 'red',
                confirmButtonText: 'Ok!',
                showCloseButton: true,
                showClass: {
                    popup: 'animate__animated animate__shakeX'
                },
            })
        }
        else {
            axios
                .post("http://localhost:3006/api/actionplan", {
                    projectStartDate,
                    projectEndDate,
                    documentationStartDate,
                    documentationEndDate,
                    databasStartDate,
                    databasEndDate,
                    codeStartDate,
                    codeEndDate,
                    testStartDate,
                    testEndDate,
                    deployStartDate,
                    deployEndDate,
                    projectId,
                    employeeId,
                })
                .then((response) => {
                    if (response.data.message) {
                        Swal.fire({
                            text: response.data.message,
                            icon: "warning",
                            dangerMode: true,
                            showConfirmButton: false,
                            showCancelButton: true,
                            cancelButtonColor: '#d33',
                            // showCloseButton: true,
                            showClass: {
                                popup: 'animate__animated animate__shakeX'
                            },
                        })
                    }
                    else {
                        Swal.fire({
                            title: "Send Successfully",
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2000,
                        })
                    }
                })
            // .catch((err) => toast.error(err.response.data));
        }
    }

    const [width, setWidth] = useState();

    const handleDataFromChild = (data) => {
        setWidth(data);
    };

    return (

        <div>

            <SideBar path="/dashboard" title="Manager Dashboard" sendDataToParent={handleDataFromChild} />

            <div className={styles.main} style={{ marginLeft: `${width}`, width: `calc(100% - ${width})` }}>
                <>
                    <h2 className={styles.projectTitle}>Project Action Plan</h2>

                    <div className={styles.addProject}>
                        <div className={styles.actions}>
                            <p>PROJECT PERIED : </p>
                            <div>
                                <label>Start Date</label>
                                <input type="date" value={projectStartDate} name='movie_Name'></input>
                            </div>
                            <div>
                                <label>End Date</label>
                                <input type="date" value={projectEndDate} name='movie_Name'></input>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <p>DOCUMENTAION :</p>
                            <div>
                                <label>Start Date</label>
                                <input type="date" name='movie_Name' onChange={(e) => { setDocumentationStartDate(e.target.value) }}></input>
                            </div>
                            <div>
                                <label>End Date</label>
                                <input type="date" name='movie_Name' onChange={(e) => { setDocumentationEndDate(e.target.value) }}></input>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <p>DATABASE DESIGN :</p>
                            <div>
                                <label>Start Date</label>
                                <input type="date" name='movie_Name' onChange={(e) => { setDatabasStartDate(e.target.value) }}></input>
                            </div>
                            <div>
                                <label>End Date</label>
                                <input type="date" name='movie_Name' onChange={(e) => { setDatabasEndDate(e.target.value) }}></input>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <p>CODE IMPLMENTATION :</p>
                            <div>
                                <label>Start Date</label>
                                <input type="date" name='movie_Name' onChange={(e) => { setCodeStartDate(e.target.value) }}></input>
                            </div>
                            <div>
                                <label>End Date</label>
                                <input type="date" name='movie_Name' onChange={(e) => { setCodeEndDate(e.target.value) }}></input>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <p>TEST :</p>
                            <div>
                                <label>Start Date</label>
                                <input type="date" name='movie_Name' onChange={(e) => { setTestStartDate(e.target.value) }}></input>
                            </div>
                            <div>
                                <label>End Date</label>
                                <input type="date" name='movie_Name' onChange={(e) => { setTestEndDate(e.target.value) }}></input>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <p>DEPLOY :</p>
                            <div>
                                <label>Start Date</label>
                                <input type="date" name='movie_Name' onChange={(e) => { setDeployStartDate(e.target.value) }}></input>
                            </div>
                            <div>
                                <label>End Date</label>
                                <input type="date" name='movie_Name' onChange={(e) => { setDeployEndDate(e.target.value) }}></input>
                            </div>
                        </div>
                    </div>
                    <div className={styles.addProjectbutton}>
                        <button onClick={() => addProjects()}>Send</button>
                    </div>


                </>

            </div>

        </div>
    )
}
