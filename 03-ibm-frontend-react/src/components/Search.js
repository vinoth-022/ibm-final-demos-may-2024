import React, { useState } from 'react';
import EmpService from '../services/EmpServices';


function Search() {
    const [usename, setUseName] = useState('');
    const [employeeDetails, setEmployeeDetails] = useState(null);

    const handleChange = (event) => {
        setUseName(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const user = await EmpService.search(usename);
            console.log(user);
           setEmployeeDetails(user[0]);
    
        }
        catch (error) {
            console.log(error);
            if (error.code === 'ERR_BAD_REQUEST')
                alert(error.message);
        }
    }

    return (
        <div className="container mt-5">
            <div className="input-group mb-3">
                <input type="text" value={usename} className="form-control" placeholder="Enter name to search" onChange={handleChange} />
                <button className="btn btn-primary" type="button" onClick={handleSubmit}>Search</button>
            </div>
            
            {employeeDetails && (
                <div className="card mt-3">
                    <div className="card-header">Employee Details</div>
                    <div className="card-body">
                        <p><strong>Name:</strong> {employeeDetails.firstname}</p>
                        <p><strong>Aadhar:</strong> {employeeDetails.lastname || 'N/A'}</p>
                        <p><strong>Salary:</strong> {employeeDetails.salary || 'N/A'}</p>
                        <p><strong>Email:</strong> {employeeDetails.email}</p>
                        <p><strong>Address:</strong> {employeeDetails.address}</p>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Search;