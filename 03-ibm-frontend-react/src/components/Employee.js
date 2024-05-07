import { useEffect, useState } from "react";
import AddEmployee from "./AddEmployee";
import EmpList from "./EmpList";
import TableView from "./TableView";
import ControlPanel from "./ControlPanel/ControlPanel";
import axios from "axios";
import { Provider } from "react-redux";
import DeleteEmployee from "./DeleteEmployee";
import UpdateEmployee from "./UpdateEmployee";
import Search from "./Search";





const Employee = () => {


    return (
        <>
            <AddEmployee/>
            <br/>
            <DeleteEmployee/>
            <br/>
            <UpdateEmployee/>
            <br/>
            <Search/>
            <br/>
            <TableView/>
        </>
    );
};

export default Employee;
