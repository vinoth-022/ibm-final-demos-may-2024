import axios from "axios";
import { useState } from "react";
import EmpService from "../services/EmpServices";
import { useDispatch } from "react-redux";
import { addEmployee } from '../redux/EmployeeSlice';




// const AddEmployee = ({updateTableData}) => {
    const AddEmployee = () => {

    const dispatch = useDispatch()


    const [empData, setEmpData] = useState({ firstname: '', lastname: '', email: '', salary: '', address: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (evt) => {
        setEmpData({ ...empData, [evt.target.name]: evt.target.value });
        setErrors({ ...errors, [evt.target.name]: '' });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!empData.firstname.trim()) {
            newErrors.firstname = "First name is required";
            isValid = false;
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(empData.email)) {
            newErrors.email = "Invalid email address";
            isValid = false;
        }


        if (empData.salary <= 0 || isNaN(empData.salary)) {
            newErrors.salary = "Salary must be a positive number";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit =async (evt) => {
        evt.preventDefault();
        if (validateForm()) {
            try {
                const user = await EmpService.addEmp(empData);
                console.log(user);
               setEmpData({ firstname: '', lastname: '', email: '', salary: '', address: '' });
               dispatch(addEmployee(user));
            }
            catch (error) {
                console.log(error);
                if (error.code === 'ERR_BAD_REQUEST')
                    alert(error.message);
            }
        }
    };


    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstname">First Name:</label>
                    <input type="text" className="form-control" id="firstname" name="firstname" value={empData.firstname} onChange={handleChange} placeholder="Enter first name" required autoFocus />
                    {errors.firstname && <span className="text-danger">{errors.firstname}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="lastname">Last Name:</label>
                    <input type="text" className="form-control" id="lastname" name="lastname" value={empData.lastname} onChange={handleChange} placeholder="Enter last name" required />
                    {errors.lastname && <span className="text-danger">{errors.lastname}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email" name="email" value={empData.email} onChange={handleChange} placeholder="Enter email" />
                    {errors.email && <span className="text-danger">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="salary">Salary:</label>
                    <input type="number" className="form-control" id="salary" name="salary" value={empData.salary} onChange={handleChange} placeholder="Enter salary" />
                    {errors.salary && <span className="text-danger">{errors.salary}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" className="form-control" id="address" name="address" value={empData.address} onChange={handleChange} placeholder="Enter address" required />
                </div>
                <br/>

                <button type="submit" className="btn btn-primary">Add Employee</button>
            </form>
        </div>
    );
};

export default AddEmployee;
