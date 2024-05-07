import { useEffect, useState } from "react";
import AddEmployee from "./AddEmployee";
import EmpList from "./EmpList";
import TableView from "./TableView";
import ControlPanel from "./ControlPanel/ControlPanel";
import axios from "axios";
import { Provider } from "react-redux";


const Employee = () => {


    return (
        <>
            <AddEmployee/>
            <br/>
            <TableView/>
        </>
    );
};

export default Employee;
