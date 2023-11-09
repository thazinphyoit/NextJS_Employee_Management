// api.js
import axios from 'axios';

export  async function fetchEmployees() {
  const maxRetryAttempts = 3;
  let retryCount = 0;
  let delay = 1000; // Initial delay in milliseconds

  async function fetchData() {
    try {
      const response = await fetch('https://dummy.restapiexample.com/api/v1/employees');
      if (response.status === 429) {
        // Exponential backoff: Wait for a longer period after each retry
        delay *= 2;
        retryCount++;
        if (retryCount < maxRetryAttempts) {
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchData();
        }
      }  else if (response.status === 200) {
        // Employee added successfully, now refresh the employee list
        const data = await response?.json();
        console.log("get employees", data);
        return data;
      } else {
        console.error('Failed to get employees. Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }

  return fetchData();
}

export async function addEmployee(newEmployeeData) {
  const maxRetryAttempts = 3;
  let retryCount = 0;
  let delay = 1000; // Initial delay in milliseconds

  async function postData() {
    try {
      const response = await axios.post('https://dummy.restapiexample.com/api/v1/create', newEmployeeData);

      if (response.status === 429) {
        // Exponential backoff: Wait for a longer period after each retry
        delay *= 2;
        retryCount++;
        if (retryCount < maxRetryAttempts) {
          await new Promise(resolve => setTimeout(resolve, delay));
          return postData();
        }
      } else if (response.status === 200) {
        // Employee added successfully, now refresh the employee list
        console.log("add employee", response.data);
      } else {
        console.error('Failed to add employee. Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  }

  await postData();
}

export async function fetchEmployeeById(employeeId) {
  const maxRetryAttempts = 3;
  let retryCount = 0;
  let delay = 1000; // Initial delay in milliseconds

  async function fetchDataById(id) {
    try {
      const response = await fetch(`https://dummy.restapiexample.com/api/v1/employees/${id}`);

      if (response.status === 429) {
        // Exponential backoff: Wait for a longer period after each retry
        delay *= 2;
        retryCount++;
        if (retryCount < maxRetryAttempts) {
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchDataById(id);
        }
      } else if (response.status === 200) {
        // Employee found successfully, now get the data
        const data = await response?.json();
        console.log("get employee by id", data);
        return data;
      } else if (response.status === 404) {
        // Employee with the specified ID was not found
        console.log('Employee not found with ID:', id);
        return null;
      } else {
        console.error('Failed to get employee by ID. Unexpected response status:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching data by ID:', error);
      return null;
    }
  }

  return fetchDataById(employeeId);
}

