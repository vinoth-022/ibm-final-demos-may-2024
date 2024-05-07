import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
    name: 'employee',
    initialState: { 
        tableData: [],
        employees: [],
    },
    reducers: {

        addEmployee: (state,action) => {
            state.tableData.push(action.payload);
        },

        setTableData: (state, action) => {
            state.tableData = action.payload;
        },
        updatedEmployee:(state,action)=>{
            const index=state.employees.findIndex(emp=>emp.id===action.payload.id);
               // If the employee is found, update its properties
               if (index !== -1) {
                  state.employees[index] = action.payload;
              }
          },
        showEmpList:(state,action)=>{
            state.tableData=action.payload;
    }
    }
});

export const { setTableData, updatedEmployee,addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
