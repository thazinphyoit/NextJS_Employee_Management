"use client"
// employeeList.js
import React, { useEffect } from 'react';
import { fetchEmployees } from "../api";
import useEmployeeStore from "../store";
import { Button, Grid, Typography, Container, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper } from '@mui/material';
import Link from 'next/link';

function EmployeeList() {

  useEffect(() => {
    // Call the fetchEmployees function when the component mounts
    fetchEmployees().then(data => {
      if (data) {
        useEmployeeStore.setState({ employees: data.data });
      } else {
        console.log('Data retrieval failed after retries.');
        // setTimeout(()=>{
        //   window.location.reload();
        // }, 10000);
      }
    });
  }, []);

  const employees = useEmployeeStore(state => state.employees) || [];

  return (
    <Container>
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> <Typography variant="h6">ID</Typography></TableCell>
                <TableCell> <Typography variant="h6">Name</Typography></TableCell>
                <TableCell> <Typography variant="h6">Salary</Typography></TableCell>
                <TableCell> <Typography variant="h6">Age</Typography></TableCell>
                <TableCell> <Typography variant="h6">Profile</Typography></TableCell>
                <TableCell> <Typography variant="h6">Actions</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.length 
              ? employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <Typography variant="h6">
                      {employee.id || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">
                      {(employee.employee_name.length > 25
                        ? `${employee.employee_name.substring(0, 25)}...`
                        : employee.employee_name) || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">
                      {employee.employee_salary || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">
                      {employee.employee_age || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <img
                      src={employee.profile_image}
                      alt={employee.employee_name || '-'}
                      width={100}
                      height={100}
                    />
                  </TableCell>
                  <TableCell>
                    <Link href="/edit-employee/[id]" as={`/edit-employee/${employee.id}`}>
                      <Button variant="contained" color="warning">
                        Edit
                      </Button>
                    </Link>
                    &nbsp;&nbsp;&nbsp;
                    <Link href="">
                      <Button variant="contained" color="error">
                        Delete
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              )) 
              : 
              <TableRow>
                  <TableCell colSpan={10}>
                    <Typography variant="h6" align="center">
                      No data!
                    </Typography>
                  </TableCell>
              </TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
}

export default EmployeeList;
