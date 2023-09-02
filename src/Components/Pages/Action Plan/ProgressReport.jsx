import React from 'react'
import styles from "./project.module.css";
import { BsSearch } from "react-icons/bs";
import { useState, useEffect } from 'react';
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

const ProgressReport = () => {

    const user = JSON.parse(localStorage.getItem("user2"));
    const id = user.data[0].id;


    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 100,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "projectStartDate",
            headerName: "Project Start Date",
            width: 200,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "projectEndDate",
            headerName: "Project End Date",
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
            field: "employeeId",
            headerName: "Employee Id",
            width: 180,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "Approval",
            headerClassName: "column-header",
            width: 150,
            renderCell: (params) => renderApprovalButton(params, params.row.approval),
        },

        {
            field: "Detail",
            headerClassName: "column-header",
            width: 150,
            renderCell: (params) => renderDetialButton(params, params.row.id),
        },
        {
            field: "Progress",
            headerClassName: "column-header",
            width: 200,
            renderCell: (params) => renderProgressButton(params, params.row.projectId),
        },
    ]

    const navigate = useNavigate();
    const renderProgressButton = (params, id) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => { navigate(`/SendProgress/${id}`) }}>
                    Send Progress
                </Button>
            </strong >
        );
    };

    const renderApprovalButton = (params, approval) => {
        return (
            <>
                {approval === "Approved" ?
                    <strong>

                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => {
                                handleClickopen()
                                setProjectId(id)
                            }}>
                            Approved
                        </Button>
                    </strong > : ""
                }
                {approval === "Declined" ?
                    <strong>

                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => {
                                handleClickopen()
                                setProjectId(id)
                            }}>
                            Declined
                        </Button>
                    </strong > : ""
                }

                {approval === "Pending" ?
                    <strong>

                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => {
                                handleClickopen()
                                setProjectId(id)
                            }}>
                            Pending
                        </Button>
                    </strong > : ""
                }


            </>

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
                        // handleClickDelete(id)
                    }}>
                    Delete
                </Button>
            </strong>
        );
    };

    const [dataSource, setDataSource] = useState([])
    const loddata = async () => {
        const response = await axios.get(`http://localhost:3006/api/employee/actionplan/${id}`);
        setDataSource(response.data);
        console.log(id)
    }
    useEffect(() => {
        loddata()
    }, []);


    const formattedData = dataSource.map((item, index) => ({
        // id: index + 1, // Assign a unique id to each row
        ...item,
    }));

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

    const [width, setWidth] = useState();

    const handleDataFromChild = (data) => {
        setWidth(data);
    };

    return (
        <>

            <SideBar path="/project" title="Manager Dashboard" sendDataToParent={handleDataFromChild} />

            <div className={styles.main} style={{ marginLeft: `${width}`, width: `calc(100% - ${width})` }}>
                <div>
                    <p className={styles.OTP_RequestTitle}>Action Plan</p>
                    <div style={{ height: "70vh", width: "98%", margin: 'auto', marginTop: '10px', marginBottom: '100px', textAlign: 'center' }}>
                        <div className={styles.buttonClass} >
                            {/* <Link to='/registration' style={{ textDecoration: 'none' }}> */}
                            {/* <button onClick={() => handleClickopen1()}><AiOutlinePlus style={{ fontSize: '18px', color: 'white' }}></AiOutlinePlus>Add Project</button> */}
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
            </div>

        </>
    )
}

export default ProgressReport