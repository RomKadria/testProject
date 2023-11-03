// src/components/SimpleGetResponse.tsx
import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { Container, Typography, Paper } from '@mui/material';
import { ServerResponse } from '../types/serverResponse';
// import useFetch from 'use-http';


interface simepleProps {
  number?: number;
}

interface FilterParams {
  filter: string;
}

const SimpleGetResponse: React.FC<simepleProps> = ({ number }) => {
  const [responseData, setResponseData] = useState<string>('');
  // const {
  //   data: myData,
  //   error,
  // } = useFetch<ServerResponse>(`/api`, {}, []);

  // useEffect(() => {
  //   if (myData) {
  //     setResponseData(myData.message)
  //     console.log(number)
  //   }

  //   console.log(myData)
  // },[myData])

  // useEffect(() => {

  //   console.log(error)
  // },[error])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filters: FilterParams = {filter: "ds"}
        const response = await axios.get<ServerResponse>(`/4`, {
          params: filters,
        }); 
        console.log(response);
        setResponseData(response.data.message);
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
