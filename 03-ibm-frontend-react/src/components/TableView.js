import React, { useEffect, useState, useMemo } from 'react';
import { useTable, usePagination, useSortBy, useRowSelect } from 'react-table';
// import './TableView.css';
import axios from 'axios';
import COLUMNS from '../utills/Columns';

export default function TableView({ tableData, setTableData, setSelectedFlatRows, setIsOneRowSelected, setIsRowSelected, updateTable }) {
    useEffect(() => {
        axios.get("http://localhost:8080/emp/get-all-emps").then(response => setTableData(response.data));
    }, []);

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => tableData, [tableData]);
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
        state,
        selectedFlatRows,
      } = useTable(
        {
          columns,
          data,
          initialState: { pageIndex: 0, pageSize: 10 }
        },
        useSortBy,
        usePagination,
        useRowSelect,
        hooks => {
          hooks.visibleColumns.push(columns => [
            {
              id: 'selection',
              Header: ({ getToggleAllRowsSelectedProps }) => (
                <div>
                  <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
                </div>
              ),
              Cell: ({ row }) => (
                <div>
                  <input type="checkbox" {...row.getToggleRowSelectedProps()} />
                </div>
              ),
            },
            ...columns,
          ]);
        }
      );

      useEffect(() => {
        try {
            setSelectedFlatRows(selectedFlatRows);
            setIsOneRowSelected(selectedFlatRows.length === 1);
            setIsRowSelected(selectedFlatRows.length > 0 && selectedFlatRows.length < 40);
        } catch (error) {
            console.error(error);
        }
      });

    const { pageIndex, pageSize } = state;

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
                                        {column.isSorted ? (column.isSortedDesc ? ' ᐃ' : ' ᐁ') : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className='tableView' style={{ display: 'flex', justifyContent: 'center' }}>
            <div className='tableFunctions'>
                <button className='btn btn-primary' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>ᐊᐊ</button>
                <button className='btn btn-primary' onClick={previousPage} disabled={!canPreviousPage}>ᐊ</button>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageCount}
                    </strong>{' '}
                </span>
                <button className='btn btn-primary' onClick={nextPage} disabled={!canNextPage}>ᐅ</button>
                <button className='btn btn-primary' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>ᐅᐅ</button>
            </div>
        </div>
        </div>
    );
}
