import React from 'react'
import styles from "./project.module.css";
import { BsSearch } from "react-icons/bs";
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Pagination } from 'antd';
import axios from 'axios';
import SideBar from '../../Common/SideBar/SideBar';

const Employees_Project = () => {

    // const user =  localStorage.getItem("user2");
    // const user = localStorage.getItem("user2");
    const user = JSON.parse(localStorage.getItem("user2"));
    const id = user.data[0].id;
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



    return (
        <div>
            {/* <Header path="/project" title="Projects" /> */}

            <SideBar path="/Eproject" title="Manager Dashboard" sendDataToParent={handleDataFromChild} />

            <div className={styles.main} style={{ marginLeft: `${width}`, width: `calc(100% - ${width})` }}>

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