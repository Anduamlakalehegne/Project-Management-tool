import React from 'react'
import styles from "./project.module.css";
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import swal from "sweetalert";
import withReactContent from 'sweetalert2-react-content'
import 'animate.css';
import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
import { Pagination } from 'antd';
import { Link, useParams } from 'react-router-dom';
import SideBar from '../../Common/SideBar/SideBar';
import { useForm } from 'react-hook-form';

const SendProgress = () => {


    const { projectId } = useParams();



    const [dataSource, setDataSource] = useState([])

    const loddata = async () => {
        const response = await axios.get(`http://localhost:3006/api/projectProgress/detail/${projectId}`)
        setDataSource(response.data);
        setProject(response.data[0].project)
        setDocumentation(response.data[0].documentation)
        setDatabase(response.data[0].databas)
        setCode(response.data[0].code)
        setTest(response.data[0].test)
        setDeploy(response.data[0].deploy)
    }
    useEffect(() => {
        loddata()
    }, []);

    const [project, setProject] = useState("");
    const [documentation, setDocumentation] = useState("");
    const [database, setDatabase] = useState("");
    const [code, setCode] = useState("");
    const [test, setTest] = useState("");
    const [deploy, setDeploy] = useState("");
    console.log(project)
    console.log(documentation)
    console.log(database)
    console.log(code)
    console.log(test)
    console.log(deploy)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        handleClick();
    };

    const handleClick = async () => {

        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const data = {
                project,
                documentation,
                database,
                code,
                test,
                deploy,
                projectId,

            };
            const config = {
                headers,
                mode: 'no-cors',
            };
            const response = await axios.put(
                'http://localhost:3006/api/projectProgress',
                data,
                config,
            )

            if (response.status === 200) {
                const MySwal = withReactContent(Swal);
                MySwal.fire({
                    html: (<p><span style={{ fontSize: '19px', color: '#ff6b0b' }}>Registerd Sucessfully</span> </p>),
                    icon: 'success',
                    denyButtonText: "Close",
                    allowOutsideClick: false,
                    showCloseButton: true,
                })
                // setProject("")
                // setDocumentation("")
                // setDatabase("")
                // setCode("")
                // setTest("")
                // setDeploy("")
            }
            else {
                const MySwal = withReactContent(Swal);
                MySwal.fire({
                    html: (
                        <>
                            <h5 style={{ fontSize: '19px', textAlign: 'center', color: 'red' }}>Faild to Assigne</h5>
                        </>
                    ),
                    showConfirmButton: false,
                    showDenyButton: true,
                    icon: 'error',
                    denyButtonText: "Close",
                    allowOutsideClick: false,
                    showCloseButton: true,
                })
                setPop2(false)

            }

        } catch (error) {
            console.log(error + "error");
            Swal.fire({
                title: "Something Went Wrong?",
                text: `net::ERR_INTERNET_DISCONNECTED `,
                icon: "warning",
                dangerMode: true,
                showConfirmButton: false,
                showCancelButton: true,
                cancelButtonColor: '#d33',
                showClass: {
                    popup: 'animate__animated animate__shakeX'
                },
                allowOutsideClick: false,
                showCloseButton: true,
            })
        }

    }

    const [width, setWidth] = useState();

    const handleDataFromChild = (data) => {
        setWidth(data);
    };





    return (
        <>
            <SideBar path="/project" title="Manager Dashboard" sendDataToParent={handleDataFromChild} />

            <div className={styles.main} style={{ marginLeft: `${width}`, width: `calc(100% - ${width})` }}>
                <>
                    <h2 className={styles.projectTitle}>Project progress</h2>

                    <h2 style={{ color: "#e24f00", marginLeft: '11%', marginTop: '20px' }}>Project ID {projectId}</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className={styles.addProject}>

                            {dataSource.map(items => (
                                <>
                                    <div className={styles.actions2}>
                                        <p>PROJECT : </p>
                                        <div>
                                            <label>Select Project Progress</label>
                                            <select
                                                value={project}
                                                onChange={(e) => setProject(e.target.value)}>
                                                <option value="Not Started">Not Started</option>
                                                <option value="On Progress">On Progress</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className={styles.actions2}>
                                        <p>DOCUMENTAION :</p>
                                        <div>
                                            <label>Select Documentstion Progress</label>
                                            <select
                                                value={documentation}
                                                onChange={(e) => setDocumentation(e.target.value)}>
                                                <option value="Not Started">Not Started</option>
                                                <option value="On Progress">On Progress</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={styles.actions2}>
                                        <p>DATABASE DESIGN :</p>
                                        <div>
                                            <label>Select Database Progress</label>
                                            <select
                                                value={database}
                                                onChange={(e) => setDatabase(e.target.value)}>
                                                <option value="Not Started">Not Started</option>
                                                <option value="On Progress">On Progress</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={styles.actions2}>
                                        <p>CODE IMPLMENTATION :</p>
                                        <div>
                                            <label>Select Code Progress</label>
                                            <select
                                                value={code}
                                                onChange={(e) => setCode(e.target.value)}>
                                                <option value="Not Started">Not Started</option>
                                                <option value="On Progress">On Progress</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={styles.actions2}>
                                        <p>TEST :</p>
                                        <div>
                                            <label>Select Testing Progress</label>
                                            <select
                                                value={test}
                                                onChange={(e) => setTest(e.target.value)}>
                                                <option value="Not Started">Not Started</option>
                                                <option value="On Progress">On Progress</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={styles.actions2}>
                                        <p>DEPLOY :</p>
                                        <div>
                                            <label>Select Deployement Progress</label>
                                            <select
                                                value={deploy}
                                                onChange={(e) => setDeploy(e.target.value)}>
                                                <option value="Not Started">Not Started</option>
                                                <option value="On Progress">On Progress</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div >
                        <div className={styles.addProjectbutton}>
                            <button type='submit'>Send</button>
                        </div>
                    </form>


                </>

            </div>

        </>
    )
}

export default SendProgress;
