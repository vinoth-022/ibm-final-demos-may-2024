import axios from 'axios';
import { setTableData, setLoading, setError } from '../redux/EmployeeSlice';
import store from '../redux/Store';

const EmpService = {
    getAllEmp: async () => {
        try {
            const response = await axios.get("http://localhost:8080/emp/get-all-emps");
            return response.data
        } catch (error) {
            return error
        }
    }
};

export default EmpService;

