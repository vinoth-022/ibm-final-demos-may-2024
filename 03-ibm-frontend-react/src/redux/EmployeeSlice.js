import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
    name: 'employee',
    initialState: { 
        tableData: [],
        // loading: false,
        // error: null
    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload;
        },
        // setLoading: (state, action) => {
        //     state.loading = action.payload;
        // },
        // setError: (state, action) => {
        //     state.error = action.payload;
        // }
    }
});

export const { setTableData, setLoading, setError } = employeeSlice.actions;
export default employeeSlice.reducer;
