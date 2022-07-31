import { Box } from '@mui/material'
import React, { FC, useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SearchBox from './SearchBox';


const Table: FC = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [dataFinal, setDataFinal] = useState([]);

    const fetchAll = async () => {
        setLoading(true)
        return fetch("https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f").
            then((res) => res.json()).
            then((data) => {
                data.result.auditLog.forEach((object: any, i: Number) => {
                    object.id = i;
                });
                setData(data.result.auditLog);
                setDataFinal(data.result.auditLog)
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchAll();
    }, [])

    const searchLog = (searches: any) => {
        setLoading(true);

        let mainData: any = data;

        let employeeSearchData: any = [];
        let actionTypeSearchData: any = [];
        let applicationTypeSearchData: any = [];
        let applicationId: any = [];
        let finalData: any = []

        // logId or employeeName
        if (searches.employeeName) {
            mainData.map((log: any) => {
                if (log.logId.toString().includes(searches.employeeName.toString())) {
                    employeeSearchData.push(log)
                }
            })
        } else {
            employeeSearchData = mainData
        }
        // action type
        if (searches.actionType) {
            employeeSearchData.map((log: any) => {
                if (log.actionType.toString().includes(searches.actionType.toString())) {
                    actionTypeSearchData.push(log)
                }
            })
        } else {
            actionTypeSearchData = employeeSearchData;
        }
        // action type
        if (searches.applicationType) {
            actionTypeSearchData.map((log: any) => {
                if (log.applicationType.toString().includes(searches.applicationType.toString())) {
                    applicationTypeSearchData.push(log)
                }
            })
        } else {
            applicationTypeSearchData = actionTypeSearchData;
        }
        // action type
        if (searches.applicationId) {
            applicationTypeSearchData.map((log: any) => {
                if (log.applicationId.toString().includes(searches.applicationId.toString())) {
                    applicationId.push(log)
                }
            })
        } else {
            applicationId = applicationTypeSearchData;
        }
        // date range 
        if (searches.fromDate && searches.toDate) {
            applicationId.filter((log: any) => {
                var date = new Date(log.creationTimestamp);
                if (date >= searches.fromDate && date <= searches.toDate) {
                    finalData.push(log)
                }
            })
        } else {
            finalData = applicationId;
        }

        setDataFinal(finalData)
        setLoading(false);
    }

    const columns: GridColDef[] = [
        { field: 'logId', headerName: 'Log ID', width: 251 },
        { field: 'applicationType', headerName: 'Application Type', width: 251 },
        { field: 'applicationId', headerName: 'Application ID', width: 251 },
        { field: 'actionType', headerName: 'Action', width: 251 },
        { field: 'logInfo', headerName: 'Action Details', width: 251 },
        { field: 'creationTimestamp', headerName: 'Date: Time', width: 251 },

    ];
    if (loading) return <h1>Loading...</h1>
    return (
        <div>

            <Box sx={{ height: '90vh', width: '90vw' }}>
                <SearchBox searchLog={searchLog} />
                <DataGrid
                    rows={dataFinal}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </Box>
        </div>
    )
}

export default Table