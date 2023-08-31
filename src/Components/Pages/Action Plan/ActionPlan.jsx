import React from 'react'
import styles from "./project.module.css";
import { FaHome } from 'react-icons/fa';
import { AiFillCar } from "react-icons/ai";
import { FaRoute } from "react-icons/fa";
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
        {
            field: "documentationStartDate",
            headerName: "Documentation Start Date",
            width: 200,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "documentationEndDate",
            headerName: "Documentation End Date",
            width: 200,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "databasStartDate",
            headerName: "Database Start Date",
            width: 170,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "databasEndDate",
            headerName: "Database End Date",
            width: 170,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "Approval",
            headerClassName: "column-header",
            width: 150,
            renderCell: (params) => renderApprovalButton(params, params.row.id),
        },

        {
            field: "Detail",
            headerClassName: "column-header",
            width: 150,
            renderCell: (params) => renderDetialButton(params, params.row.id),
        },
        {
            field: "Delete",
            headerClassName: "column-header",
            width: 150,
            renderCell: (params) => renderDeleteButton(params, params.row.id,),
        },
    ]

    const renderApprovalButton = (params, id,) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => {
                        // handleClickopen()
                        // setProjectId(id)
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
    const renderDeleteButton = (params, id) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => {
                        handleClickDelete(id)
                    }}>
                    Delete
                </Button>
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

    const [totalPages, setTotalPage] = useState(1);



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
    console.log(employid)
    // console.log(approval) 
    const makeApproval = (approval) => {
        Axios.put("http://localhost:3006/actionplan/update", { employid, approval })
            .then(
                (response) => {
                    if (response.data.message) {
                        Swal.fire({
                            icon: 'success',
                            title: `${approval} Sucessfully`,
                            confirmButtonColor: '#00cc44',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ok!',
                            showCloseButton: true,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                setPop2(false)
                            }
                        })
                    }
                    else {
                        Swal.fire({
                            title: `${approval} Sucessfully`,
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2000,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                setPop2(false)
                            }
                        })
                    }

                }
            );

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
