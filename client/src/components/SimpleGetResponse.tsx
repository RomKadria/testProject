// src/components/SimpleGetResponse.tsx
import React, { useState, useEffect } from 'react';
// import axios from '../axios';
import { Container, Typography, Paper, Button } from '@mui/material';
import { ServerResponse } from '../types/serverResponse';
import useFetch from 'use-http';
import { useNavigate } from 'react-router-dom';


interface simpleProps {
  number?: number;
}

interface FilterParams {
  value: string;
}

const SimpleGetResponse: React.FC<simpleProps> = ({ number }) => {
  const [responseData, setResponseData] = useState<string>('');
  const {
    get, response, loading, error
  } = useFetch<ServerResponse>(`/`, {}, []);
  const navigate = useNavigate();


  useEffect(() => { initResponse() }, [])

  const initResponse = async () => {
    const filter: FilterParams = {value: 'hello'};
    const id = '4';
    const initResponse = await get(`${id}?filter=${filter.value}`);
    console.log(number);
    if (response.ok) setResponseData(initResponse.message)
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const filters: FilterParams = {filter: "ds"}
  //       const response = await axios.get<ServerResponse>(`/4`, {
  //         params: filters,
  //       }); 
  //       console.log(response);
  //       setResponseData(response.data.message);
  //     } catch (error) {
  //       console.error('Error fetching data: ', error);
  //       setResponseData('Failed to load data from server');
  //     }
  //   };

  //   fetchData();
  //   console.log(number);
  // }, []);


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
      <Button onClick={() => navigate("/simpler")}>Go to Other Component</Button>
    </Container>
  );
};

export default SimpleGetResponse;
