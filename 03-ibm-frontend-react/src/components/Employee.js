import { useEffect, useState } from "react";
import AddEmployee from "./AddEmployee";
import EmpList from "./EmpList";
import TableView from "./TableView";
import ControlPanel from "./ControlPanel/ControlPanel";
import axios from "axios";



const Employee = () => {

    const [tableData, setTableData] = useState([]);
    const [selectedFlatRows, setSelectedFlatRows] = useState([]);
    const [isOneRowSelected, setIsOneRowSelected] = useState(false);
    const [isRowSelected, setIsRowSelected] = useState(false);
    const [updateTable, setUpdateTable] = useState(false);

    
    // Callback function to update table data
    const updateTableData = () => {
        axios.get("http://localhost:8080/emp/get-all-emps")
            .then(response => setTableData(response.data))
            .catch(error => console.error('Error updating table data:', error));
    };

    return (
        <>
            <AddEmployee updateTableData={updateTableData}/>
            <br/>
            <TableView tableData={tableData} setTableData={setTableData} setSelectedFlatRows={setSelectedFlatRows} setIsOneRowSelected={setIsOneRowSelected} setIsRowSelected={setIsRowSelected} updateTable={updateTable}/>
        </>
    );
};

export default Employee;
