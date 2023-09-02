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
import Button from "@mui/material/Button";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AiOutlinePlus } from "react-icons/ai";
import SideBar from '../../Common/SideBar/SideBar';

const Projects = () => {


    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 100,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "projectName",
            headerName: "Project Name",
            width: 200,
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
            field: "startDate",
            headerName: "Start Date",
            width: 200,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "endDate",
            headerName: "End Date",
            width: 180,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        // {
        //     field: "description",
        //     headerName: "Description",
        //     width: 370,
        //     headerClassName: "column-header",
        //     cellClassName: "column-cell",
        // },
        {
            field: "Assign",
            headerClassName: "column-header",
            width: 150,
            renderCell: (params) => renderAssignButton(params, params.row.projectId),
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

    const renderAssignButton = (params, id,) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => {
                        handleClickopen()
                        setProjectId(id)
                    }}>
                    Assign
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
                `http://localhost:3006/api/project/delete/${id}`,
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


    const columns2 = [
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
            field: "employeeEmail",
            headerName: "Employee Email",
            width: 200,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        // {
        //     field: "role",
        //     headerName: "Role",
        //     width: 180,
        //     headerClassName: "column-header",
        //     cellClassName: "column-cell",
        // },
        {
            field: "project",
            headerName: "End Date",
            width: 180,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "Assign",
            headerClassName: "column-header",
            width: 150,
            renderCell: (params) => renderAssignProjectButton(params, params.row.employeeId),
        },

        // {
        //     field: "Detail",
        //     headerClassName: "column-header",
        //     width: 150,
        //     renderCell: (params) => renderDetialButton(params, params.row.id),
        // },
        // {
        //     field: "Delete",
        //     headerClassName: "column-header",
        //     width: 150,
        //     renderCell: (params) => renderDeleteButton(params, params.row.id,),
        // },
    ]

    const renderAssignProjectButton = (params, employeeId,) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => {
                        assignProject(employeeId)
                        // assignEmployee(employeeId)
                        closePopup5()
                    }}>
                    Select
                </Button>
            </strong>
        );
    };

    const renderDetialButton2 = (params, id, currentPosition, nameOfEmployee) => {
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
    const renderDeleteButton2 = (params, id) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => {
                        // handleClickDelete(id)
                    }}>
                    Delete
                </Button>
            </strong>
        );
    };




    const assignProject = async (employid) => {

        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const data = {
                projectTd,
                employid,
            };
            const data2 = {
                employid,
            };

            const response2 = await axios.put(
                'http://localhost:3006/update/user',
                data2,
            )

            const response = await axios.put(
                'http://localhost:3006/update',
                data,
            )
            if (response.status === 200) {
                const MySwal = withReactContent(Swal);
                MySwal.fire({
                    html: (
                        <>
                            <p>
                                <span style={{ fontSize: '19px', color: '#ff6b0b' }}> Assigned Sucessfully</span>
                            </p>
                        </>
                    ),
                    icon: 'success',
                    denyButtonText: "Close",
                    allowOutsideClick: false,
                    showCloseButton: true,
                })
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

    const [projectName, setMovieName] = useState("");
    const [projectId, setReview] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const [dataSource, setDataSource] = useState([])

    const loddata = async () => {
        const response = await axios.get("http://localhost:3006/api/insert")
        setDataSource(response.data);
    }
    useEffect(() => {
        loddata()
    }, []);



    const [dataSource2, setDataSource2] = useState([])

    const loddata2 = async () => {
        const response = await axios.get("http://localhost:3006/api/employee/assign")
        setDataSource2(response.data);
    }
    useEffect(() => {
        loddata2()
    }, []);

    const addProjects = () => {

        if (!projectName || !projectId || !startDate || !endDate) {
            Swal.fire({
                title: "Please fill all fields",
                icon: 'error',
                // showCancelButton: true,
                confirmButtonColor: 'red',
                confirmButtonText: 'Ok!',
                showCloseButton: true,
                // showClass: {
                //     popup: 'animate__animated animate__shakeX'
                // },
            })
        }
        else {
            axios
                .post("http://localhost:3006/api/insert", {
                    projectName,
                    projectId,
                    startDate,
                    endDate,
                    description,
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
                            title: "Successfully Added",
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2000,
                        })
                        loddata()
                    }
                })

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

    const [projectTd, setProjectId] = useState(false);

    const formattedData = dataSource.map((item, index) => ({
        // id: index + 1, // Assign a unique id to each row
        ...item,
    }));

    const formattedData2 = dataSource2.map((item, index) => ({
        // id: index + 1, // Assign a unique id to each row
        ...item,
    }));

    const [width, setWidth] = useState();

    const handleDataFromChild = (data) => {
        setWidth(data);
    };



    return (

        <div>


            <SideBar path="/project" title="Manager Dashboard" sendDataToParent={handleDataFromChild} />

            <div className={styles.main} style={{ marginLeft: `${width}`, width: `calc(100% - ${width})` }}>
                <>

                    <div>
                        <p className={styles.OTP_RequestTitle}>Project List</p>
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

                    {popup2 ?
                        <>
                            <div>
                                <div className={styles.popup}>
                                    <div className='animate__animated animate__zoomIn'>
                                        <div className={styles.popupInner2}>
                                            <button className={styles.closeBtn} onClick={closePopup5}>X</button>

                                            <div className={styles.addProject}>
                                                <h2>Add Project</h2>

                                                <label>PROJECT NAME</label>
                                                <input type="text" name='movie_Name' placeholder='Please enter project name...' onChange={(e) => { setMovieName(e.target.value) }}></input>

                                                <label>PROJECT ID</label>
                                                <input type="text" name='movie_Review' placeholder='Please enter project id...' onChange={(e) => { setReview(e.target.value) }}></input>

                                                <label >PROJECT START DATE</label>
                                                <input type="date" placeholder='Please enter project start date' onChange={(e) => setStartDate(e.target.value)}></input>

                                                <label>PROJECT END DATE</label>
                                                <input type="date" placeholder='Please enter project end date' onChange={(e) => setEndDate(e.target.value)}></input>

                                                <label >PROJECT DESCRIPTION</label>
                                                <textarea type="text" placeholder='Please enter project start date' onChange={(e) => setDescription(e.target.value)}></textarea>
                                            </div>
                                            <div className={styles.addProjectbutton}>
                                                <button onClick={() => {
                                                    addProjects()
                                                    closePopup5()
                                                }}>Add</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </> : ""}

                </>

                {/* <div className={styles.search}>
                    <p title='search'>
                        <BsSearch className={styles.icn} size="1.5rem" color='rgb(63, 63, 63)'></BsSearch>
                        <input type="text" id="myInput" placeholder="Search"></input>
                        <button>Search</button>
                    </p>
                </div>

                <div className={styles.outer_table} id='myTable'>

                    <p>Project Lists</p>

                    <table className={styles.grid_table} id="myTable">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Project Name</th>
                                <th>Project Code</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Detail</th>
                                <th>Assigne Project</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                currentPage.map(item => {
                                    return <tr className='active_row'>
                                        <td>{item.id}</td>
                                        <td>{item.projectName}</td>
                                        <td>{item.projectId}</td>
                                        <td>{item.startDate}</td>
                                        <td>{item.endDate}</td>
                                        <td> <button>Detail</button></td>
                                        <td> <button onClick={() => {
                                            handleClickopen()
                                            setProjectId(item.id)
                                        }}>Assign</button></td>
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
                </div>
                <div className={styles.addProjectbutton}>
                    <button onClick={() => handleClickopen1()}>Add Projects</button>
                </div> */}

                {popup ?
                    <>
                        <div>
                            <div className={styles.popup}>
                                <div className='animate__animated animate__zoomIn'>
                                    <div className={styles.popupInner}>
                                        <button className={styles.closeBtn} onClick={closePopup5}>X</button>


                                        <div>
                                            <p className={styles.OTP_RequestTitle}>Employee List</p>
                                            <div style={{ height: "60vh", width: "98%", margin: 'auto', marginTop: '10px', marginBottom: '10px', textAlign: 'center' }}>
                                                <DataGrid
                                                    sx={{
                                                        m: 2,
                                                        border: 1,
                                                        borderColor: 'primary.light', '& .MuiDataGrid-cell:hover': { color: 'primary.main', },
                                                    }}
                                                    checkboxSelection
                                                    rows={formattedData2}
                                                    columns={columns2}
                                                    components={{ Toolbar: GridToolbar }}
                                                />
                                            </div>
                                        </div>




                                        {/* <div className={styles.vehicle_search}>
                                            <p title='search'>
                                                <BsSearch className={styles.icn} size="1.5rem" color='rgb(63, 63, 63)'></BsSearch>
                                                <input type="text" id="myInput" placeholder="Search"></input>
                                                <button>Search</button>
                                            </p>
                                        </div> */}

                                        {/* <div className={styles.outer_table} id='myTable'>

                                            <p>User Lists</p>

                                            <table className={styles.grid_table} id="myTable">

                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Employee Name</th>
                                                        <th>Employee Id</th>
                                                        <th>Email</th>
                                                        <th>Role</th>
                                                        <th>Project</th>
                                                        <th>Assign</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {
                                                        currentPage2.map(item => {
                                                            return <tr className='active_row'>
                                                                <td>{item.id}</td>
                                                                <td>{item.employeeName}</td>
                                                                <td>{item.employeeId}</td>
                                                                <td>{item.employeeEmail}</td>
                                                                <td>{item.role}</td>
                                                                <td>{item.project}</td>
                                                                <td> <button onClick={() => {
                                                                    assignProject(item.id)
                                                                    closePopup5()
                                                                }}>Select</button></td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className={styles.page}>
                                            <Pagination
                                                onChange={(page) => setCurentPage(page)}
                                                pageSize={postPerPage2}
                                                current={page2}
                                                total={totalPages2}
                                                showQuickJumper
                                                showSizeChanger
                                                onShowSizeChange={onShowSizeChange}
                                            />
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    : ""}



            </div>
        </div>
    )
}
export default Projects;