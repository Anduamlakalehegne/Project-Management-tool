import { useState } from 'react'
import Login from './Components/Pages/Login/Login'
import { Routes, Route, Link, useNavigate, Navigate, BrowserRouter as Router } from "react-router-dom";
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import Projects from './Components/Pages/Projects/Projects';
import Employees_Registration from './Components/Pages/Employees Registration/Employees_Registration';
import Employees_Project from './Components/Pages/Employees Projects/Employees_Project';
import SetActionPlan from './Components/Pages/Action Plan/SetActionPlan';
import ProgressReport from './Components/Pages/Action Plan/ProgressReport';
import ActionPlan from './Components/Pages/Action Plan/ActionPlan';
import SendProgress from './Components/Pages/Project Progress/SendProgress';
import TrackProgress from './Components/Pages/Project Progress/TrackProgress';

function App() {

  return (
    <>
      <div className="App">
        <Router>

          <Routes>
            <Route path='/' element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/project" element={<Projects />}></Route>
            <Route path="/Employees_Registration" element={<Employees_Registration />}></Route>
            <Route path="/Eproject" element={<Employees_Project />}></Route>
            <Route path="/actionplan/:projectId/:projectStartDate/:projectEndDate" element={<SetActionPlan />}></Route>
            <Route path="/ProgressReport" element={<ProgressReport />}></Route>
            <Route path="/ActionPlan" element={<ActionPlan />}></Route>
            <Route path="/SendProgress/:projectId" element={<SendProgress />}></Route>
            <Route path="/TrackProgress/:id/:projectId" element={<TrackProgress />}></Route>
            {/* 
            <Route path="/SetActionPlan" element={<SetActionPlan />}></Route>
            <Route path="/employeeProfile" element={<EmployeeProfile />}></Route>
            <Route path="/SendProgress" element={<SendProgress />}></Route> */}
            {/* <Route path="/ActionPlan" element={<ActionPlan />}></Route> */}
          </Routes>

        </Router>
      </div>

    </>
  )
}

export default App
