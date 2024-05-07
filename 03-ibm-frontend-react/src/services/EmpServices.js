import axios from 'axios';
import { setTableData, setLoading, setError } from '../redux/EmployeeSlice';
import store from '../redux/Store';

const EmpService = {

    addEmp: async (employee) => {
        try {
            const response = await axios.post("http://localhost:8080/emp/add-emp",employee);
            console.log(employee)
            return response.data
        } catch (error) {
            return error
        }
    },

    getAllEmp: async () => {
        try {
            const response = await axios.get("http://localhost:8080/emp/get-all-emps");
            return response.data
        } catch (error) {
            return error
        }
    },

    update: async (employee, eid) => {
        try {
            const response = await axios.put(`http://localhost:8080/emp/update-emp/${eid}`, employee);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error(error.response.data.message || error.message);
        }
    },

    delete: async (eid) => {
        try {
            const response = await axios.post(`http://localhost:8080/emp/delete-emp/${eid}`);
            console.log(response.data);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
            throw new Error(error);
        }
    },

    search: async (fName) => {
            try {
                const response = await axios.get(`http://localhost:8080/emp/get-emp-by-name/${fName}`);
                return response.data
            } catch (error) {
                return error
            }
        },
   



};

export default EmpService;

