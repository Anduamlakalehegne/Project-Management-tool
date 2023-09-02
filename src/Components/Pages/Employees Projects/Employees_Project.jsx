import React from 'react'
import styles from "./project.module.css";
import { BsSearch } from "react-icons/bs";
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Pagination } from 'antd';
import axios from 'axios';
import Button from "@mui/material/Button";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AiOutlinePlus } from "react-icons/ai";
import SideBar from '../../Common/SideBar/SideBar';

const Employees_Project = () => {

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
            field: "Detail",
            headerClassName: "column-header",
            width: 150,
            renderCell: (params) => renderDetialButton(params, params.row.id),
        },

        {
            field: "Action Plan",
            headerClassName: "column-header",
            width: 150,
            renderCell: (params) => renderActionPlanButton(params, params.row.projectId, params.row.startDate, params.row.endDate,),
        },
        // {
        //     field: "Delete",
        //     headerClassName: "column-header",
        //     width: 150,
        //     renderCell: (params) => renderDeleteButton(params, params.row.id,),
        // },
    ]

    const renderDetialButton = (params, id,) => {
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
                    Detail
                </Button>
            </strong>
        );
    };
    const navigate = useNavigate();

    const renderActionPlanButton = (params, projectId, startDate, endDate) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => { navigate(`/actionplan/${projectId}/${startDate}/${endDate}`) }}
                >
                    Set
                </Button>
            </strong>
        );
    };
    // const renderDeleteButton = (params, id) => {
    //     return (
    //         <strong>
    //             <Button
    //                 variant="contained"
    //                 color="error"
    //                 size="small"
    //                 onClick={() => {
    //                     handleClickDelete(id)
    //                 }}>
    //                 Delete
    //             </Button>
    //         </strong>
    //     );
    // };


    // const user =  localStorage.getItem("user2");
    // const user = localStorage.getItem("user2");
    const user = JSON.parse(localStorage.getItem("user2"));
    const id = user.data[0].employeeId;
    console.log(id)


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

    const loddata = async () => {
        const response = await axios.get(`http://localhost:3006/api/employee/project/${id}`);
        setDataSource(response.data);
        setTotalPage(response.data.length)
    }
    useEffect(() => {
        loddata()
    }, []);

    const [width, setWidth] = useState();

    const handleDataFromChild = (data) => {
        setWidth(data);
    };

    const formattedData = dataSource.map((item, index) => ({
        // id: index + 1, // Assign a unique id to each row
        ...item,
    }));




    return (
        <div>
            {/* <Header path="/project" title="Projects" /> */}

            <SideBar path="/Eproject" title="Manager Dashboard" sendDataToParent={handleDataFromChild} />

            <div className={styles.main} style={{ marginLeft: `${width}`, width: `calc(100% - ${width})` }}>

                <div>
                    <p className={styles.OTP_RequestTitle}>Projects</p>

                    <div style={{ height: "70vh", width: "98%", margin: 'auto', marginTop: '10px', marginBottom: '100px', textAlign: 'center' }}>

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


                <div className={styles.outer_table} id='myTable'>

                    <div className={styles.search}>
                        <p title='search'>
                            <BsSearch className={styles.icn} size="1.5rem" color='rgb(63, 63, 63)'></BsSearch>
                            <input type="text" id="myInput" placeholder="Search"></input>
                            <button>Search</button>
                        </p>
                    </div>
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
                                <th>Action Plan</th>
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
                                        <td><Link to={`/actionplan/${item.projectId}/${item.startDate}/${item.endDate}`}><button>Set</button></Link></td>
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
                {/* <div className={styles.addProjectbutton}>
                    <button>Add Projects</button>
                </div> */}
            </div>
        </div>
    )
}
export default Employees_Project;