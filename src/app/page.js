import React from 'react';
import Link from 'next/link';
import { Container, Grid, Button, Typography } from '@mui/material';
import EmployeeList from '../components/EmployeeList';

export default function Home() {
  return (
    <Container>
      <Grid container style={{ justifyContent: 'center' }}>
        <Typography variant="h4" component="h1">
          Employee List
        </Typography>
      </Grid>
      <br></br>
      <Grid container spacing={2} style={{ justifyContent: 'center' }}>
        <Grid item>
          <Link href="/add-employee">
            <Button variant="contained" color="success">
              Add Employee
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <EmployeeList />
        </Grid>
      </Grid>
    </Container>
  );
}
