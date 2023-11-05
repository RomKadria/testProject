import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import useFetch from 'use-http';
import moment from 'moment';

export type CandidateData = {
  name: string;
  linkedIn?: string;
  experience: {
    title: string;
    start: string;
    end: string;
  }[]
}

const HiredScore: React.FC = () => {
  const [candidates, setCandidates] = useState<CandidateData[]>([]);
  const {
    get, response, loading, error
  } = useFetch<CandidateData[]>(`/applicant/all`);

  useEffect(() => { getApplicants() }, [])

    const getApplicants = async () => {
    const applicantsResponse = await get();
    if (response.ok) setCandidates(applicantsResponse)
  }

  const calcGap = (newStart: string, prevEnd: string ) => 
   moment(newStart).diff(moment(prevEnd), 'd');
  
  return (
    <Container component="main" maxWidth="sm" >
       {error && 'Error!'}
       {loading && 'Loading...'}
        <Typography variant="h5" component="h3">
          All candidates
        </Typography>
        {candidates.map((candidate, canIndex) => (
           <Paper style={{ padding: 20, marginTop: 30 }}>
          <Typography key={canIndex} style={{ marginTop: 15, fontWeight: 'bold' }}>
          Name: {candidate.name}
          {candidate.linkedIn && `, LinkedIn: ${candidate.linkedIn}`}
          </Typography>
          {candidate.experience.sort((a, b) => moment(b.start).diff(moment(a.start))).map((exp, expIndex) => (
             <Typography key={expIndex} style={{ marginTop: 15 }}>
              <Box>
              {expIndex !== 0 && `Gap between jobs: ${calcGap(candidate.experience[expIndex - 1].start, exp.end)} days`}
              </Box>
              <br />
              {`Worked as: ${exp.title}, From ${exp.start} To ${exp.end}`}
           </Typography>
          ))}
      </Paper>
        ))}
    </Container>
  );
};

export default HiredScore;
