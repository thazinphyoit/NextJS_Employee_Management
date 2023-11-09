// pages/add-employee.js
import EmployeeForm from '../components/EmployeeForm';
import Link from 'next/link';
import { Button, Typography, Container } from '@mui/material';

function AddEmployee() {
  return (
    <Container>
      <Typography variant="h4" component="h1" align="center">
        Add Employee
      </Typography>
      <Link href="/">
        <Button variant="contained" color="info">
          Back To Home
        </Button>
      </Link>
      <EmployeeForm />
    </Container>
  );
}

export default AddEmployee;
