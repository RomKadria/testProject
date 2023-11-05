import express, { Router } from 'express';
import axios from 'axios';
import csv from 'csv-parser';
import { Readable } from 'stream';
import { CandidateData, Profile, personExcel } from '../../utils/types';

const apiRouter = Router();

apiRouter.use(express.json());
interface QueryParams {
  filter: string;
}

const fetchJsonData = async(url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching JSON data:", error);
    return null;
  }
}

const fetchAndParseCSV = async (url: string, callback: (data: any[]) => void) => {
    const response = await axios({ url, method: 'GET', responseType: 'stream' });
    let results: any[] = [];
    response.data.pipe(csv())
      .on('data', (data: any) => results.push(data))
      .on('end', () => {
        callback(results);
      });
  }

  apiRouter.get('/applicant/all', async (req, res) => {
    const jsonDataUrl = 'https://bit.ly/3eTzIN4';
    const csvDataUrl = 'https://hs-recruiting-test-resume-data.s3.amazonaws.com/linkedin_source_b1f6-acde48001122.csv';

    const candidates: CandidateData[] = []
    const jsonData = await fetchJsonData(jsonDataUrl);
    const x = jsonData[0] as Profile;
    fetchAndParseCSV(csvDataUrl, (csvData: personExcel[]) => {
      jsonData.forEach((candidate: Profile) => {
        const normalizedPhone = candidate.contact_info.phone?.replace(/[\s-]/g, '');
        const excelInfo = csvData.find(csvItem => csvItem['Phone Number'] === normalizedPhone);
        const candidateData: CandidateData = {name:candidate.contact_info.name.formatted_name, linkedIn: excelInfo?.Linkedin, experience: [] }
        candidate.experience.forEach(exp => {
          candidateData.experience.push({title: exp.title, start: exp.start_date, end: exp.end_date})
        })

        candidates.push(candidateData);
      });
      
      res.send(candidates);
    });
  });


apiRouter.get('/', (req, res) => {
  res.json({ number: 2, message: 'simple' });
  });
  
apiRouter.get('/simpler', (req, res) => {
  res.json({ number: 2, message: 'im simpler' });
  });

apiRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const { filter } = req.query as unknown as QueryParams;
  
  res.json({ number: 2, message: 'with id', id, filter });
  });



export default apiRouter;

