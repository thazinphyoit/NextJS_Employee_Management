import { useState } from 'react';
import {addEmployee} from '../api';
import { TextField, Button, Input, Box } from '@mui/material';

function EmployeeForm({ employee }) {

  console.log("employee", employee);

  const [name, setName] = useState(employee ? employee.employee_name : '');
  const [salary, setSalary] = useState(employee ? employee.employee_salary : '');
  const [age, setAge] = useState(employee ? employee.employee_age : '');
  const [image, setImage] = useState(employee ? employee.profile_image : '');

  const handleNameChange = (e) => setName(e.target.value);
  const handleSalaryChange = (e) => {
    const inputSalary = e.target.value;
    // Validate salary input (positive number, no decimals)
    if (/^[1-9]\d*$/.test(inputSalary) || inputSalary === '') {
      setSalary(inputSalary);
    }
  };
  const handleAgeChange = (e) => setAge(e.target.value);
  const handleImageChange = (e) => {
    // Handle image upload here (e.g., save to server)
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const imageUrl = URL.createObjectURL(uploadedImage);
      setImage(imageUrl);
    }
  };
  const saveEmployee = () => {
    const newEmployee = { employee_name:name, employee_salary:salary, employee_age:age, profile_image: image };
    // Handle saving/updating the employee data, e.g., API call or Zustand store update
    addEmployee(newEmployee).then((data) => {
      // Handle success or failure as needed
      console.log(data);
      // window.location.href = "/";
    });
  };
  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
    <TextField
      fullWidth
      variant="outlined"
      label="Name"
      value={name}
      onChange={handleNameChange}
      sx={{ my: 1 }}
    />
    <TextField
      fullWidth
      variant="outlined"
      label="Salary"
      value={salary}
      onChange={handleSalaryChange}
      sx={{ my: 1 }}
    />
    <TextField
      fullWidth
      variant="outlined"
      label="Age"
      value={age}
      onChange={handleAgeChange}
      sx={{ my: 1 }}
    />
    <label htmlFor="image-input" style={{ cursor: 'pointer' }}>
      <Input
        id="image-input"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        sx={{ display: 'none' }}
      />
      <Button
        component="span"
        variant="outlined"
        sx={{ my: 1 }}
      >
        Upload Image
      </Button>
    </label>
    {image && (
      <img
        width={100}
        height={100}
        src={image}
        alt="Profile"
        sx={{ my: 2 }}
      />
    )}
    <Button
      variant="contained"
      color="success"
      onClick={saveEmployee}
      sx={{
        width: '100%',
        // backgroundColor: (theme) => theme.palette.primary.main,
        color: 'white',
        borderRadius: (theme) => theme.shape.borderRadius,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: (theme) => theme.palette.primary.dark,
        },
      }}
    >
      Save
    </Button>
  </Box>
  );
}

export default EmployeeForm;
