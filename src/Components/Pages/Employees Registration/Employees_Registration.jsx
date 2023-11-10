import React from 'react'
import styles from "./employee.module.css";
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
// import { ToastContainer, toast } from 'react-toastify'; 
import { Pagination } from 'antd';
import Button from "@mui/material/Button";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AiOutlinePlus } from "react-icons/ai";
import SideBar from '../../Common/SideBar/SideBar';

const Employees_Registration = () => {


    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 100,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "employeeName",
            headerName: "Employee Name",
            width: 200,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "employeeId",
            headerName: "Employee Id",
            width: 200,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "Position",
            headerName: "Position",
            width: 200,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "employeeEmail",
            headerName: "Employee Email",
            width: 200,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "role",
            headerName: "Role",
            width: 180,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "project",
            headerName: "Project",
            width: 180,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "Update",
            headerClassName: "column-header",
            width: 150,
            renderCell: (params) => renderUpdateButton(params, params.row.id),
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

    const renderUpdateButton = (params, id,) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => {
                        // handleClickopen()
                        // setProjectId(id)
                    }}>
                    Update
                </Button>
            </strong>
        );
    };

    const renderDetialButton = (params, id, currentPosition, nameOfEmployee) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                // onClick={() => { navigate(`/Detail_EM/${id}/${currentPosition}`) }}
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

    const handleClickDelete = (id) => {
        Swal.fire({
            text: `Are you sure You Want to Delete`,
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
                userDelete(id)
            }
        })
    }

    async function userDelete(id) {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const response = await axios.delete(
                `http://localhost:3006/api/employee/delete/${id}`,
            )
            if (response.status === 200) {
                const MySwal = withReactContent(Swal);
                MySwal.fire({
                    html: (<> <p> <span style={{ fontSize: '19px', color: '#ff6b0b' }}>Deleted Successfully</span> </p> </>),
                    icon: 'success',
                    denyButtonText: "Close",
                    allowOutsideClick: false,
                    showCloseButton: true,
                })
                loddata()
            }
            else {
                const MySwal = withReactContent(Swal);
                MySwal.fire({
                    html: (<> <h5 style={{ fontSize: '19px', textAlign: 'center', color: 'red' }}>Faild to Delete</h5> </>),
                    showConfirmButton: false,
                    showDenyButton: true,
                    icon: 'error',
                    denyButtonText: "Close",
                    allowOutsideClick: false,
                    showCloseButton: true,
                })
            }
        } catch (error) {
            console.log(error + "error");
            Swal.fire({
                title: "Something Went Wrong?",
                text: `net::ERR_INTERNET_DISCONNECTED`,
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



    const assign = () => {
        Swal.fire({
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
                // remove()
            }
        })

    }

    const [employeeName, setEmployeeName] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [employeeEmail, setEmployeeEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Position, setPosition] = useState("");
    const [dataSource, setDataSource] = useState([])
    const [totalPages, setTotalPage] = useState(1);


    const loddata = async () => {
        const response = await axios.get("http://localhost:3006/api/employee")
        setDataSource(response.data);
        setTotalPage(response.data.length)
    }
    useEffect(() => {
        loddata()
    }, []);

    const addEmployee = () => {

        if (!employeeName || !employeeId || !employeeEmail || !password || !Position) {
            Swal.fire({
                icon: 'error',
                title: "Please Fill All Information",
                // showCancelButton: true,
                confirmButtonColor: 'red',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok!',
                showCloseButton: true,
                showClass: {
                    popup: 'animate__animated animate__shakeX'
                },
            })
        }
        else {

            axios.post("http://localhost:3006/api/employee", {
                employeeName,
                employeeId,
                employeeEmail,
                password,
                Position,
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
                        setEmployeeName("");
                        setEmployeeId("");
                        setEmployeeEmail("");
                        setPassword("");
                        setPosition("")
                        Swal.fire({
                            title: "Successfully Registerd",
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2000,
                        })
                        loddata()
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
    const handleClickopen1 = () => {
        setPop2(!popup);
    }
    const closePopup5 = () => {
        setPop(false);
        setPop2(false);
    }

    const [width, setWidth] = useState();

    const handleDataFromChild = (data) => {
        setWidth(data);
    };


    return (
        <div>
            {/* <Header path="/employees" title="employees" /> */}

            <SideBar path="/employee" title="Manager Dashboard" sendDataToParent={handleDataFromChild} />

            <div className={styles.main} style={{ marginLeft: `${width}`, width: `calc(100% - ${width})` }}>
                <>

                    <div>
                        <p className={styles.OTP_RequestTitle}>Employee List</p>
                        <div style={{ height: '70vh', width: "98%", margin: 'auto', marginTop: '10px', marginBottom: '100px', textAlign: 'center', }}>

                            <div className={styles.buttonClass} >
                                <button onClick={() => handleClickopen1()}><AiOutlinePlus style={{ fontSize: '18px', color: 'white' }}></AiOutlinePlus>Add Employee</button>
                            </div>

                            <DataGrid
                                sx={{
                                    m: 2,
                                    border: 1,
                                    borderColor: 'primary.light', '& .MuiDataGrid-cell:hover': { color: 'primary.main', },
                                }}
                                checkboxSelection
                                rows={dataSource}
                                columns={columns}
                                components={{ Toolbar: GridToolbar }}
                            />
                        </div>
                    </div>


                    {popup2 ?
                        <>
                            <div>
                                <div className={styles.popup}>
                                    <div className='animate__animated animate__zoomIn'>
                                        <div className={styles.popupInner}>
                                            <button className={styles.closeBtn} onClick={closePopup5}>X</button>

                                            <div className={styles.addProject}>
                                                <h2>Add Employee</h2>
                                                <label>EMPLOYEE NAME</label>
                                                <input type="text" name='project_Name' placeholder='Please enter employee name...' onChange={(e) => {
                                                    setEmployeeName(e.target.value)
                                                }}></input>
                                                <label>EMPLOYE ID</label>
                                                <input type="text" name='employeid' placeholder='Please enter employee id...' onChange={(e) => {
                                                    setEmployeeId(e.target.value)
                                                }}></input>
                                                <label >Email</label>
                                                <input type="email" placeholder='Please enter email' onChange={(e) => setEmployeeEmail(e.target.value)}></input>
                                                <label>Position</label>
                                                <input type="text" placeholder='Please enter Position...' onChange={(e) => setPosition(e.target.value)}></input>
                                                <label>Password</label>
                                                <input type="text" placeholder='Please enter passworf...' onChange={(e) => setPassword(e.target.value)}></input>
                                            </div>
                                            <div className={styles.addProjectbutton}>
                                                <button onClick={() => {
                                                    addEmployee()
                                                    closePopup5()
                                                }}>Add</button>
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
                                    <div className='animate__animated animate__zoomIn'>
                                        <div className={styles.popupInner}>
                                            <button className={styles.closeBtn} onClick={closePopup5}>X</button>

                                            <div className={styles.addProject}>
                                                <h2>Add Employee</h2>
                                                <label>EMPLOYEE NAME</label>
                                                <input type="text" name='project_Name' placeholder='Please enter employee name...' onChange={(e) => {
                                                    setEmployeeName(e.target.value)
                                                }}></input>
                                                <label>EMPLOYE ID</label>
                                                <input type="text" name='employeid' placeholder='Please enter employee id...' onChange={(e) => {
                                                    setEmployeeId(e.target.value)
                                                }}></input>
                                                <label >Email</label>
                                                <input type="email" placeholder='Please enter email' onChange={(e) => setEmployeeEmail(e.target.value)}></input>
                                                <label>Position</label>
                                                <input type="text" placeholder='Please enter Position...' onChange={(e) => setPosition(e.target.value)}></input>
                                                <label>Password</label>
                                                <input type="text" placeholder='Please enter passworf...' onChange={(e) => setPassword(e.target.value)}></input>
                                            </div>
                                            <div className={styles.addProjectbutton}>
                                                <button onClick={() => {
                                                    addEmployee()
                                                    closePopup5()
                                                }}>Add</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </> : ""}
                </>

            </div>
        </div>
    )
}

export default Employees_Registration;
