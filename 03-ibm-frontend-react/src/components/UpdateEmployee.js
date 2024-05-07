import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmpService from '../services/EmpServices';
import { useDispatch, useSelector } from 'react-redux';
import {updatedEmployee} from "../redux/EmployeeSlice";


const UpdateEmployee = ({ employeeId: initialEmployeeId }) => {


    const [employeeId, setEmployeeId] = useState(initialEmployeeId);

    const [employee, setEmployee] = useState({
        firstname: '',
        lastname: '',
        salary: '',
        email: '',
        address: '',
    });


  const dispatch=useDispatch();
  const latestData=useSelector(state=>state.employee);
  console.log('hiiiii')
  console.log(latestData);
   

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'employeeId') {
            setEmployeeId(value);
        } else {
            setEmployee(prevEmployee => ({
                ...prevEmployee,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!employeeId) {
            console.error('Employee ID is required.');
            return;
        }
        try {
            const user = await EmpService.update(employee, employeeId); // Pass employee before employeeId
            console.log(user);
            dispatch(updatedEmployee(user));
            
    
        } catch (error) {
            console.log(error);
            if (error.code === 'ERR_BAD_REQUEST') {
                alert(error.message);
            }
        }
    };
    
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Update Employee Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="employeeId" className="form-label">Employee ID:</label>
                    <input type="text" className="form-control" id="employeeId" name="employeeId" value={employeeId} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">First Name:</label>
                    <input type="text" className="form-control" id="firstname" name="firstname" value={employee.firstname} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">Last Name:</label>
                    <input type="text" className="form-control" id="lastname" name="lastname" value={employee.lastname} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" name="email" value={employee.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="salary" className="form-label">Salary:</label>
                    <input type="number" className="form-control" id="salary" name="salary" value={employee.salary} onChange={handleChange} />
                </div>
                <div className="mb-3">
    <label htmlFor="address" className="form-label">Address:</label>
    <input type="text" className="form-control" id="address" name="address" value={employee.address} onChange={handleChange} />
</div>

                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default UpdateEmployee;