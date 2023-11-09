// pages/edit-employee.js
import { useState, useEffect } from 'react';
import EmployeeForm from '../../components/EmployeeForm';
import { Button, Typography, Container } from '@mui/material';
import Link from 'next/link';
import { fetchEmployeeById } from '../../api';
import { useRouter } from 'next/router';

function EditEmployee() {

  const router = useRouter();
  const { id } = router.query;

  const [employee, setEmployee] = useState({ employee_name:"", employee_salary:"", employee_age:"", profile_image:"" });

  // Retrieve the employee data you want to edit from the store

  useEffect(() => {
    if (id) {
      getEmployee(id);
    }
  }, [id]);

  const getEmployee = async (employeeId) => {
    try {
      fetchEmployeeById(employeeId).then(data => {
        if (data) {
          setEmployee(data);
        } else {
          console.log('Data by Id retrieval failed after retries.');
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" align="center">
        Edit Employee {`ID-${id}`}
      </Typography>
      <Link href="/">
        <Button variant="contained" color="info">
          Back To Home
        </Button>
      </Link>
      <EmployeeForm employee={employee} />
    </Container>
  );
}

export default EditEmployee;
