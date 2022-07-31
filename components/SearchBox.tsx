import { Button, TextField } from '@mui/material';
import React, { useState, useRef } from 'react'

// date picker
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function SearchBox({ searchLog }: any) {
    const [search, setSearch] = useState({
        employeeName: "",
        actionType: "",
        applicationType: "",
        fromDate: null,
        nextDate: null,
        toDate: null,
        applicationId: ""
    });

    const toDateRef: any = useRef(null);

    const handleSubmit = () => {
        searchLog(search)
    }

    const handleInput = (e: any) => {
        setSearch({ ...search, [e.target.name]: e.target.value })
    }

    const handleFromDate = (e: any) => {
        setSearch({ ...search, ["fromDate"]: e });
        toDateRef.current.focus();
    }
    const handleToDate = (e: any) => {
        setSearch({ ...search, ["toDate"]: e });
    }

    const { employeeName, actionType, applicationType, fromDate, nextDate, toDate, applicationId } = search;

    return (
        <div style={{ padding: "2px" }}>
            <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ paddingRight: "5px" }}>
                            <TextField id="outlined-basic" label="Employee Name" variant="outlined" name="employeeName" onChange={(e) => handleInput(e)} value={employeeName} />
                        </div>
                        <div style={{ paddingRight: "5px" }}>
                            <TextField id="outlined-basic" label="Action Type" variant="outlined" name="actionType" onChange={(e) => handleInput(e)} value={actionType} />
                        </div>
                        <div style={{ paddingRight: "5px" }}>
                            <TextField id="outlined-basic" label="Application Type" variant="outlined" name="applicationType" onChange={(e) => handleInput(e)} value={applicationType} />
                        </div>
                        <div style={{ paddingRight: "5px" }}>
                            <TextField id="outlined-basic" label="Application ID" variant="outlined" name="applicationId" onChange={(e) => handleInput(e)} value={applicationId} />
                        </div>
                        <div style={{ paddingRight: "5px" }}>

                            <DatePicker
                                label="From Date"
                                value={fromDate}
                                onChange={(e: any) => {
                                    handleFromDate(e);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />

                        </div>
                        <div style={{ paddingRight: "5px" }}>

                            <DatePicker
                                label="To Date"
                                value={toDate}
                                onChange={(e: any) => {
                                    handleToDate(e);
                                }}
                                minDate={fromDate}
                                ref={toDateRef}
                                renderInput={(params) => <TextField {...params} />}
                            />

                        </div>
                        <div>
                            <Button type="submit" variant="contained" onClick={() => handleSubmit()}>Search Logs</Button>
                        </div>
                    </div>
                </LocalizationProvider>
            </div>
        </div>
    )
}

export default SearchBox