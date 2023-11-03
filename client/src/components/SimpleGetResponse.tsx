// src/components/SimpleGetResponse.tsx
import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { Container, Typography, Paper } from '@mui/material';
import { ServerResponse } from '../types/serverResponse';

interface simepleProps {
  number?: number;
}

const SimpleGetResponse: React.FC<simepleProps> = ({ number }) => {
  const [responseData, setResponseData] = useState<string>('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ServerResponse>('/'); 
        setResponseData(response.data.message); // Assuming the response has a `message` field
      } catch (error) {
        console.error('Error fetching data: ', error);
        setResponseData('Failed to load data from server');
      }
    };

    fetchData();
    console.log(number);
  }, []);


  return (
    <Container component="main" maxWidth="sm" >
      <Paper style={{ padding: 20, marginTop: 30 }}>
        <Typography variant="h5" component="h3">
          Server Response
        </Typography>
        <Typography component="p" style={{ marginTop: 15 }}>
          {responseData}
        </Typography>
      </Paper>
    </Container>
  );
};

export default SimpleGetResponse;
