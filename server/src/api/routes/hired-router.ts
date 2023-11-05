import express from 'express';
import axios from 'axios';
import csv from 'csv-parser';
import { Readable } from 'stream';

const app = express();
const port = 3000;

interface personExcel {
    "Phone Number": any;
    Email: string,
    Linkedin: string,
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

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

  app.get('/process-data', async (req, res) => {
    const jsonDataUrl = 'https://bit.ly/3eTzIN4';
    const csvDataUrl = 'https://hs-recruiting-test-resume-data.s3.amazonaws.com/linkedin_source_b1f6-acde48001122.csv';
  
    const jsonData = await fetchJsonData(jsonDataUrl);
    fetchAndParseCSV(csvDataUrl, (csvData: personExcel[]) => {
      // Enrich and print data
      jsonData.forEach((candidate: any) => {
        const normalizedPhone = candidate.contact_info?.phone?.replace(/[\s-]/g, '');
        const linkedInInfo = csvData.find(csvItem => csvItem['Phone Number'] === normalizedPhone);
        console.log(`Name: ${candidate.contact_info.name.formatted_name}, LinkedIn: "${linkedInInfo?.Linkedin}`);
        candidate.experience.forEach((exp: { title: any; end_date: any; start_date: any;}) => {
            console.log(`Worked as: ${exp.title}, From ${exp.start_date} To ${exp.end_date}`)
        })
      });
      res.send(jsonData);
    });
  });