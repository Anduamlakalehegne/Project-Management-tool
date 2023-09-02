import React from 'react'
import styles from "./project.module.css";
import { FaHome } from 'react-icons/fa';
import { AiFillCar } from "react-icons/ai";
import { FaRoute } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { useState, useEffect, } from 'react';
import Swal from 'sweetalert2'
import swal from "sweetalert";
import withReactContent from 'sweetalert2-react-content'
import 'animate.css';
import Axios from "axios"
import axios from 'axios';
import { Pagination } from 'antd';
import { Link, useParams, useNavigate } from 'react-router-dom';
import SideBar from '../../Common/SideBar/SideBar';
import Button from "@mui/material/Button";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AiOutlinePlus } from "react-icons/ai";

const ActionPlan = () => {

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 60,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },

        {
            field: "projectId",
            headerName: "Project Id",
            width: 200,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "employeeId",
            headerName: "Employee Id",
            width: 180,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "projectStartDate",
            headerName: "Project Start Date",
            width: 160,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "projectEndDate",
            headerName: "Project End Date",
            width: 160,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },

        // {
        //     field: "documentationStartDate",
        //     headerName: "Documentation Start Date",
        //     width: 200,
        //     headerClassName: "column-header",
        //     cellClassName: "column-cell",
        // },
        // {
        //     field: "documentationEndDate",
        //     headerName: "Documentation End Date",
        //     width: 200,
        //     headerClassName: "column-header",
        //     cellClassName: "column-cell",
        // },
        // {
        //     field: "databasStartDate",
        //     headerName: "Database Start Date",
        //     width: 170,
        //     headerClassName: "column-header",
        //     cellClassName: "column-cell",
        // },
        // {
        //     field: "databasEndDate",
        //     headerName: "Database End Date",
        //     width: 170,
        //     headerClassName: "column-header",
        //     cellClassName: "column-cell",
        // },
        {
            field: "Approval",
            headerClassName: "column-header",
            width: 150,
            renderCell: (params) => renderApprovalButton(params, params.row.employeeId, params.row.projectId),
        },

        {
            field: "Detail",
            headerClassName: "column-header",
            width: 150,
            renderCell: (params) => renderDetialButton(params, params.row.id),
        },
        {
            field: "Status",
            headerClassName: "column-header",
            width: 150,
            renderCell: (params) => renderStatusButton(params, params.row.approval),
        },
        {
            field: "Progress",
            headerClassName: "column-header",
            width: 250,
            renderCell: (params) => renderProgressButton(params, params.row.id, params.row.projectId,),
        },
    ]

    const renderApprovalButton = (params, employeeId, projectId) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => {
                        handleClickopen2()
                        setEmployid(employeeId)
                        setProjectId(projectId)
                    }}>
                    Approval
                </Button>
            </strong>
        );
    };

    const renderDetialButton = (params, id) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => {
                        handleClickopen()
                        loddata2(id)
                    }
                    }
                >
                    Detail
                </Button>
            </strong>
        );
    };


    const navigate = useNavigate();
    const renderProgressButton = (params, id, projectId) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => { navigate(`/TrackProgress/${id}/${projectId}`) }}>
                    Track Progress
                </Button>
            </strong >
        );
    };

    const renderStatusButton = (params, approval) => {
        return (
            <strong>
                {approval === "Approved" ?
                    <Button
                        style={{ marginLeft: '10px' }}
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => {
                            // handleClickopen()
                            // setProjectId(id)
                        }}>
                        Approved
                    </Button> : ""
                }
                {approval === "Declined" ?
                    <Button
                        style={{ marginLeft: '10px' }}
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => {
                            // handleClickopen()
                            // setProjectId(id)
                        }}>
                        Declined
                    </Button> : ""
                }
                {approval === "Pending" ?
                    <Button
                        style={{ marginLeft: '10px' }}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => {
                            // handleClickopen()
                            // setProjectId(id)
                        }}>
                        Pending
                    </Button> : ""
                }
            </strong>
        );
    };

    const [dataSource, setDataSource] = useState([])
    const loddata = async () => {
        const response = await axios.get("http://localhost:3006/api/actionplan")
        setDataSource(response.data);
    }
    useEffect(() => {
        loddata()
    }, []);

    const formattedData = dataSource.map((item, index) => ({
        // id: index + 1, // Assign a unique id to each row
        ...item,
    }));

    const [dataSource2, setDataSource2] = useState([])

    const loddata2 = async (id) => {
        const response = await axios.get(`http://localhost:3006/api/actionplan/detail/${id}`);
        setDataSource2(response.data);
    }
    // useEffect(() => {
    //     loddata2()
    // }, []);

    // const formattedData = dataSource.map((item, index) => ({
    //     // id: index + 1, // Assign a unique id to each row
    //     ...item,
    // }));





    const { projectStartDate, projectEndDate } = useParams();


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

    const [projectId, setProjectId] = useState(1);



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
                })
                .then((response) => {
                    if (response.data.message) {
                        Swal.fire({
                            text: response.data.message,
                            showCancelButton: true,
                            confirmButtonColor: '#00cc44',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ok!',
                            showCloseButton: true,
                            showClass: {
                                popup: 'animate__animated animate__shakeX'
                            },
                        })
                    }
                    else {
                        Swal.fire({
                            title: "Successfully Send",
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2000,
                        })
                    }
                })
            // .catch((err) => toast.error(err.response.data));
        }
    }

    const [popup, setPop] = useState(false);
    const [popup2, setPop2] = useState(false);
    const handleClickopen = () => {
        setPop(!popup);
    }
    const handleClickopen2 = () => {
        setPop2(!popup2);
    }

    const closePopup5 = () => {
        setPop(false);
        setPop2(false);
    }
    // const [approval, setApproval] = useState("");
    const [employid, setEmployid] = useState("");


    const makeApproval = async (approval) => {

        if (approval === "Approved") {

            const data1 = {
                projectId,
            };
            const response = await axios.post(
                'http://localhost:3006/api/projectProgress/default',
                data1,
            )
        }

        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const data = {
                projectId,
                approval,

            };
            const config = {
                headers,
                mode: 'no-cors',
            };
            const response = await axios.put(
                'http://localhost:3006/actionplan/update',
                data,
                config,
            )

            if (response.status === 200) {
                const MySwal = withReactContent(Swal);
                MySwal.fire({
                    html: (
                        <>
                            <p>
                                <span style={{ fontSize: '19px', color: '#ff6b0b' }}> {approval} Sucessfully</span>
                            </p>
                        </>
                    ),
                    icon: 'success',
                    denyButtonText: "Close",
                    allowOutsideClick: false,
                    showCloseButton: true,
                })
                loddata()
                setPop2(false)
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

        // .then(
        //     (response) => {
        //         if (response.data.message) {
        //             Swal.fire({
        //                 icon: 'success',
        //                 title: `${approval} Sucessfully`,
        //                 confirmButtonColor: '#00cc44',
        //                 cancelButtonColor: '#d33',
        //                 confirmButtonText: 'Ok!',
        //                 showCloseButton: true,
        //             }).then((result) => {
        //                 if (result.isConfirmed) {
        //                     setPop2(false)
        //                 }
        //             })
        //         }
        //         else {
        //             Swal.fire({
        //                 title: `${approval} Sucessfullyyy`,
        //                 icon: 'success',
        //                 showConfirmButton: false,
        //                 timer: 2000,
        //             }).then((result) => {
        //                 if (result.isConfirmed) {
        //                     setPop2(false)
        //                 }
        //             })
        //         }

        //     }
        // );

    }

    const [width, setWidth] = useState();

    const handleDataFromChild = (data) => {
        setWidth(data);
    };


    return (

        <div>
            {/* <Header path="/ActionPlan" title="Action Plan" /> */}

            <SideBar path="/employee" title="Manager Dashboard" sendDataToParent={handleDataFromChild} />

            <div className={styles.main} style={{ marginLeft: `${width}`, width: `calc(100% - ${width})` }}>
                <>

                    <div>
                        <p className={styles.OTP_RequestTitle}>Project Action Plan</p>
                        <div style={{ height: "70vh", width: "98%", margin: 'auto', marginTop: '10px', marginBottom: '100px', textAlign: 'center' }}>
                            <div className={styles.buttonClass} >
                                {/* <Link to='/registration' style={{ textDecoration: 'none' }}> */}
                                <button onClick={() => handleClickopen1()}><AiOutlinePlus style={{ fontSize: '18px', color: 'white' }}></AiOutlinePlus>Add Project</button>
                                {/* </Link> */}
                            </div>
                            <DataGrid
                                sx={{
                                    m: 2,
                                    border: 1,
                                    borderColor: 'primary.light', '& .MuiDataGrid-cell:hover': { color: 'primary.main', },
                                }}
                                checkboxSelection
                                rows={formattedData}
                                columns={columns}
                                components={{ Toolbar: GridToolbar }}
                            />
                        </div>
                    </div>

                    {/* <h2 className={styles.projectTitle}>Project Action Plan</h2>

                    <div className={styles.search}>
                        <p title='search'>
                            <BsSearch className={styles.icn} size="1.5rem" color='rgb(63, 63, 63)'></BsSearch>
                            <input type="text" id="myInput" placeholder="Search"></input>
                            <button>Search</button>
                        </p>
                    </div>

                    <div className={styles.outer_table} id='myTable'>


                        <p>Action Plan</p>

                        <table className={styles.grid_table} id="myTable">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Project_Start_Date</th>
                                    <th>Project_End_Date</th>
                                    <th>Project Id</th>
                                    <th>Employee Id</th>
                                    <th>Detail</th>
                                    <th>Edit</th>
                                    <th>Approval</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    currentPage.map(item => {
                                        return <tr className='active_row'>
                                            <td>{item.id}</td>
                                            <td>{item.projectStartDate}</td>
                                            <td>{item.projectEndDate}</td>
                                            <td>{item.projectId}</td>
                                            <td>{item.employeeId}</td>
                                            <td> <button onClick={() => handleClickopen()}>Detail</button></td>
                                            <td> <button>Edit</button></td>
                                            <td> <button onClick={() => {
                                                handleClickopen2()
                                                setEmployid(item.employeeId)
                                            }}>Approval</button></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.page}>
                        <Pagination
                            onChange={(page) => setCurentPage(page)}
                            pageSize={postPerPage}
                            current={page}
                            total={totalPages}
                            showQuickJumper
                            showSizeChanger
                            onShowSizeChange={onShowSizeChange}
                        />
                    </div> */}
                </>

                {popup2 ?
                    <>
                        <div>
                            <div className={styles.popup}>
                                <div className='animate__animated animate__slideInDown'>
                                    <div className={styles.popupInner2}>
                                        <button className={styles.closeBtn} onClick={closePopup5}>X</button>
                                        <div className={styles.selectApproval}>
                                            <h2 className={styles.projectTitle}>Select Action</h2>
                                            <p onClick={() => {
                                                makeApproval("Approved")
                                            }} className={styles.approve}>Approve</p>
                                            <p onClick={() => {
                                                makeApproval("Declined")
                                            }} className={styles.decline}>Decline</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </> : ""}

                {popup ?
                    <>
                        <div>
                            <div className={styles.popup}>
                                <div className='animate__animated animate__slideInDown'>
                                    <div className={styles.popupInner}>
                                        <button className={styles.closeBtn} onClick={closePopup5}>X</button>

                                        <h2 className={styles.projectTitle}>Project Action Plan Detail</h2>

                                        {dataSource2.map(item => (
                                            <div className={styles.addProject}>

                                                <div className={styles.actions} style={{ marginTop: '44px', display: 'flex', justifyContent: 'start' }}>
                                                    <p >Status :
                                                        {item.approval === "Approved" ?
                                                            <Button
                                                                style={{ marginLeft: '10px' }}
                                                                variant="contained"
                                                                color="success"
                                                                size="small"
                                                                onClick={() => {
                                                                    handleClickopen()
                                                                    setProjectId(id)
                                                                }}>
                                                                Approved
                                                            </Button> : ""
                                                        }
                                                        {item.approval === "Declined" ?
                                                            <Button
                                                                style={{ marginLeft: '10px' }}
                                                                variant="contained"
                                                                color="error"
                                                                size="small"
                                                                onClick={() => {
                                                                    handleClickopen()
                                                                    setProjectId(id)
                                                                }}>
                                                                Declined
                                                            </Button> : ""
                                                        }
                                                        {item.approval === "Pending" ?
                                                            <Button
                                                                style={{ marginLeft: '10px' }}
                                                                variant="contained"
                                                                color="primary"
                                                                size="small"
                                                                onClick={() => {
                                                                    handleClickopen()
                                                                    setProjectId(id)
                                                                }}>
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
                                                        <label>Start Date</label>
                                                        <input type="date" value={item.deployStartDate}  ></input>
                                                    </div>
                                                    <div>
                                                        <label>End Date</label>
                                                        <input type="date" value={item.deployEndDate}  ></input>
                                                    </div>
                                                </div>


                                            </div>

                                        ))}


                                        {/* <div className={styles.addProjectbutton}>
                                            <button>Update</button>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </> : ""}

            </div>

        </div>
    )
}

export default ActionPlan;
