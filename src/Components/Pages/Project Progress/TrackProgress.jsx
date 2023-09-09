import React from 'react'
import styles from "./trackProgress.module.css";
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
import Button from "@mui/material/Button";

const TrackProgress = () => {


    const { id, projectId } = useParams();



    const [dataSource, setDataSource] = useState([])

    const loddata = async () => {
        const response = await axios.get(`http://localhost:3006/api/projectProgress/detail/${projectId}`)
        setDataSource(response.data);
        console.log(dataSource)
    }
    useEffect(() => {
        loddata()
    }, []);

    const [dataSource2, setDataSource2] = useState([])

    const loddata2 = async () => {
        const response = await axios.get(`http://localhost:3006/api/actionplan/detail/${id}`);
        setDataSource2(response.data);
        console.log(dataSource2)
    }
    useEffect(() => {
        loddata2()
    }, []);


    const [width, setWidth] = useState();

    const handleDataFromChild = (data) => {
        setWidth(data);
    };


    return (
        <>
            <SideBar path="/project" title="Manager Dashboard" sendDataToParent={handleDataFromChild} />

            <div className={styles.main} style={{ marginLeft: `${width}`, width: `calc(100% - ${width})` }}>

                <>
                    <div>

                        <h2 className={styles.projectTitle}>Project Progress</h2>

                        {dataSource2.map(item => (
                            <div className={styles.addProject}>

                                {dataSource.map(items => (
                                    <>

                                        <div className={styles.actions} style={{ marginTop: '44px', display: 'flex', justifyContent: 'start' }}>
                                            <p >Status :
                                                {item.approval === "Approved" ?
                                                    <Button
                                                        style={{ marginLeft: '10px' }}
                                                        variant="contained"
                                                        color="success"
                                                        size="small">
                                                        Approved
                                                    </Button> : ""
                                                }
                                                {item.approval === "Declined" ?
                                                    <Button
                                                        style={{ marginLeft: '10px' }}
                                                        variant="contained"
                                                        color="error"
                                                        size="small">
                                                        Declined
                                                    </Button> : ""
                                                }
                                                {item.approval === "Pending" ?
                                                    <Button
                                                        style={{ marginLeft: '10px' }}
                                                        variant="contained"
                                                        color="primary"
                                                        size="small">
                                                        Pending
                                                    </Button> : ""
                                                }
                                            </p>
                                        </div>

                                        <div className={styles.actions}>
                                            <p>Project Id :</p>
                                            <div>
                                                <input value={item.projectId}></input>
                                            </div>
                                        </div>

                                        <div className={styles.actions}>
                                            <p>Employee Id :</p>
                                            <div>
                                                <input value={item.employeeId}></input>
                                            </div>
                                        </div>

                                        <div className={styles.actions}>
                                            <p>PROJECT PERIED : </p>
                                            {/* <div>
                                                <Button
                                                    style={{ margin: '15px 0px', width: '116%' }}
                                                    variant="contained"
                                                    color={items.project === "Not Started" ? "error" : items.project === "Completed" ? "success" : 'primary'}
                                                    size="small">
                                                    {items.project}
                                                </Button>
                                            </div> */}
                                            <div>
                                                <label>Start Date</label>
                                                <input type="date" value={item.projectStartDate} ></input>
                                            </div>
                                            <div>
                                                <label>End Date</label>
                                                <input type="date" value={item.projectEndDate}  ></input>
                                            </div>

                                        </div>
                                        <div className={styles.actions}>
                                            <p>DOCUMENTAION :</p>
                                            <div>
                                                <Button
                                                    style={{ margin: '15px 0px', width: '100%' }}
                                                    variant="contained"
                                                    color={items.documentation === "Not Started" ? "error" : items.documentation === "Completed" ? "success" : 'primary'}
                                                    size="small">
                                                    {items.documentation}
                                                </Button>
                                            </div>
                                            <div>
                                                <label>Start Date</label>
                                                <input type="date" value={item.documentationStartDate}  ></input>
                                            </div>
                                            <div>
                                                <label>End Date</label>
                                                <input type="date" value={item.documentationEndDate}  ></input>
                                            </div>

                                        </div>
                                        <div className={styles.actions}>
                                            <p>DATABASE DESIGN :</p>
                                            <div>
                                                <Button
                                                    style={{ margin: '15px 0px', width: '100%' }}
                                                    variant="contained"
                                                    color={items.databas === "Not Started" ? "error" : items.databas === "Completed" ? "success" : 'primary'}
                                                    size="small">
                                                    {items.databas}
                                                </Button>
                                            </div>
                                            <div>
                                                <label>Start Date</label>
                                                <input type="date" value={item.databasStartDate}  ></input>
                                            </div>
                                            <div>
                                                <label>End Date</label>
                                                <input type="date" value={item.databasEndDate}  ></input>
                                            </div>

                                        </div>
                                        <div className={styles.actions}>
                                            <p>CODE IMPLMENTATION :</p>
                                            <div>
                                                <Button
                                                    style={{ margin: '15px 0px', width: '100%' }}
                                                    variant="contained"
                                                    color={items.code === "Not Started" ? "error" : items.code === "Completed" ? "success" : 'primary'}
                                                    size="small">
                                                    {items.code}
                                                </Button>
                                            </div>
                                            <div>
                                                <label>Start Date</label>
                                                <input type="date" value={item.codeStartDate} ></input>
                                            </div>
                                            <div>
                                                <label>End Date</label>
                                                <input type="date" value={item.codeEndDate}  ></input>
                                            </div>

                                        </div>
                                        <div className={styles.actions}>
                                            <p>TEST :</p>
                                            <div>
                                                <Button
                                                    style={{ margin: '15px 0px', width: '100%' }}
                                                    variant="contained"
                                                    color={items.test === "Not Started" ? "error" : items.test === "Completed" ? "success" : 'primary'}
                                                    size="small">
                                                    {items.test}
                                                </Button>
                                            </div>
                                            <div>
                                                <label>Start Date</label>
                                                <input type="date" value={item.testStartDate}  ></input>
                                            </div>
                                            <div>
                                                <label>End Date</label>
                                                <input type="date" value={item.testEndDate}  ></input>
                                            </div>

                                        </div>
                                        <div className={styles.actions}>
                                            <p>DEPLOY :</p>
                                            <div>
                                                <Button
                                                    style={{ margin: '15px 0px', width: '100%' }}
                                                    variant="contained"
                                                    color={items.deploy === "Not Started" ? "error" : items.deploy === "Completed" ? "success" : 'primary'}
                                                    size="small">
                                                    {items.deploy}
                                                </Button>
                                            </div>
                                            <div>
                                                <label>Start Date</label>
                                                <input type="date" value={item.deployStartDate}  ></input>
                                            </div>
                                            <div>
                                                <label>End Date</label>
                                                <input type="date" value={item.deployEndDate}  ></input>
                                            </div>

                                        </div>
                                    </>
                                ))}

                            </div>

                        ))}

                    </div>
                </>

            </div>
        </>
    )
}
export default TrackProgress;
