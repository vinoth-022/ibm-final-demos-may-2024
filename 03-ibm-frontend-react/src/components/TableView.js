import React, { useEffect, useState, useMemo } from 'react';
import { useTable, usePagination, useSortBy, useRowSelect } from 'react-table';
// import './TableView.css';
import axios from 'axios';
import { useSelector, useDispatch  } from "react-redux";
import COLUMNS from '../utills/Columns';
import EmpService from "../services/EmpServices";
import { setTableData } from '../redux/EmployeeSlice';

export default function TableView() {
  const dispatch = useDispatch();
  
  const tableData = useSelector(state => state.employee.tableData);
//   const loading = useSelector(state => state.employee.loading);
//   const error = useSelector(state => state.employee.error);

  useEffect(() => {
      // Fetch data when component mounts
      // You can also trigger this action based on certain events if needed
      EmpService.getAllEmp()
      .then((res)=>{
        console.log(res)
        dispatch(setTableData(res))
        return res
      })
      .catch(err =>{
        return err
      })

  
  }, []);

  const columns = React.useMemo(() => COLUMNS, []);

  const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      nextPage,
      previousPage,
      canPreviousPage,
      canNextPage,
      pageCount,
      gotoPage,
      setPageSize,
      state: { pageIndex, pageSize },
  } = useTable(
      {
          columns,
          data: tableData,
          initialState: { pageIndex: 0, pageSize: 10 },
      },
      useSortBy,
      usePagination,
      useRowSelect
  );


  return (
      <div className='tableView'>
          <table className='table table-striped' {...getTableProps()}>
              <thead>
                  {headerGroups.map(headerGroup => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map(column => (
                              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                  {column.render('Header')}
                                  <span>
                                      {column.isSorted ? (column.isSortedDesc ? ' ↓' : ' ↑') : ''}
                                  </span>
                              </th>
                          ))}
                      </tr>
                  ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                  {page.map(row => {
                      prepareRow(row);
                      return (
                          <tr {...row.getRowProps()}>
                              {row.cells.map(cell => {
                                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                              })}
                          </tr>
                      );
                  })}
              </tbody>
          </table>
          <div className='pagination'>
              <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                  {'<<'}
              </button>{' '}
              <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                  {'<'}
              </button>{' '}
              <button onClick={() => nextPage()} disabled={!canNextPage}>
                  {'>'}
              </button>{' '}
              <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                  {'>>'}
              </button>{' '}
              <span>
                  Page{' '}
                  <strong>
                      {pageIndex + 1} of {pageCount}
                  </strong>{' '}
              </span>
          </div>
      </div>
  );
}