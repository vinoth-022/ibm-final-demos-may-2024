import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
    name: 'employee',
    initialState: { 
        tableData: [],
        employees: [],
    },
    reducers: {
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
    }
});

export const { setTableData, updatedEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
