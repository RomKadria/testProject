// src/components/SimpleGetResponse.tsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { ServerResponse } from '../types/serverResponse';
import useFetch from 'use-http';


const SimplerGetResponse: React.FC = () => {
  const [responseData, setResponseData] = useState<string>('');
  const {
    get, response, loading, error
  } = useFetch<ServerResponse>(`/`);

  useEffect(() => { initResponse() }, [])

  const initResponse = async () => {
    const initResponse = await get(`/simpler`);
    if (response.ok) setResponseData(initResponse.message)
  }

  return (
    <Container component="main" maxWidth="sm" >
       {error && 'Error!'}
      {loading && 'Loading...'}
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

export default SimplerGetResponse;
