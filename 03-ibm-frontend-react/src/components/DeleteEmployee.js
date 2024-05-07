import { useState } from "react";
import EmpService from "../services/EmpServices";


const DeleteEmployee = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [message, setMessage] = useState('');
 

    const handleInputChange = async (event) => {
        setEmployeeId(event.target.value);
       
    };
   
   
    const deleteEmployee = async () => {
        console.log(employeeId);
        console.log('hi');
        try {
            const user = await EmpService.delete(employeeId.toString()); // Ensure employeeId is converted to a string if it's not already
            console.log('Data deleted successfully');
            console.log(user);
        } catch (error) {
            console.log(error);
            if (error.code === 'ERR_BAD_REQUEST')
                alert(error.message);
        }
    };
    



    return (
        <div className="container">
            <h2>Delete Employee</h2>
            <div className="mb-3">
                <label htmlFor="employeeId" className="form-label">Employee ID:</label>
                <input
                    type="text"
                    id="employeeId"
                    name="employeeId"
                    value={employeeId}
                    onChange={handleInputChange}
                    className="form-control"
                />
            </div>
            <button onClick={deleteEmployee} className="btn btn-danger">Delete Employee</button>
            <p className="mt-3">{message}</p>
        </div>
    );
};



export default DeleteEmployee;