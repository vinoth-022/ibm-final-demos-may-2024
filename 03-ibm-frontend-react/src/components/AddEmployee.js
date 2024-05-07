import axios from "axios";
import { useState } from "react";
import Employee from "./Employee";

// const AddEmployee = ({updateTableData}) => {
    const AddEmployee = () => {


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

    // const handleSubmit = (evt) => {
    //     evt.preventDefault();
    //     if (validateForm()) {
    //         axios.post(backendUrl, empData)
    //             .then((resp) => {
    //                 alert(`${resp.data.firstName} with id ${resp.data.id} added successfully!`);
    //                 setEmpData({ firstName: '', email: '', aadhaar: '', salary: '' });
    //             })
    //             .catch(error => {
    //                 console.error("Error adding employee:", error);
    //             });
    //     }
    // };

    const handleSubmit = (evt) => {

        evt.preventDefault();
        if (validateForm()) {
        // Send a POST request to your endpoint with the employee data
        axios.post('http://localhost:8080/emp/add-emp', empData)
            .then(response => {
                console.log('Employee data saved:', response.data);
                setEmpData({ firstname: '', lastname: '', email: '', salary: '', address: '' });
                // Update table data or perform any necessary actions
                // setTableData([]);
                // updateTableData();
            })
            .catch(error => {
                console.error('Error saving employee data:', error);
                // Handle error if necessary
            });
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
