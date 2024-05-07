import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
    name: 'employee',
    initialState: { 
        tableData: [],
    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload;
        },
    }
});

export const { setTableData, setLoading, setError } = employeeSlice.actions;
export default employeeSlice.reducer;
