import { Container, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Company, CompanyTimeSlot } from "../../types";
import CompanyColumn from "../../components/CompanyColumn";

const API_URL = '/api/companies';

const fetchCompaniesData = async () => {
  return axios
    .get(API_URL)
    .then(({ data }) => {
      return data.data;
    }).catch(err => {});
};

export default function TimeSlotManager () {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [listOfRanges, setListOfRanges] = useState<CompanyTimeSlot[]>([]);
  const handleSelectTimeSlot = (newSelectedSlot: CompanyTimeSlot) => {
    setListOfRanges([...listOfRanges, newSelectedSlot]);
  };

  useEffect(() => {
    const doFetch = () => fetchCompaniesData().then(res => {
      if (res === undefined) return;
      const result = res;
      setCompanies(result);
    });
    doFetch();
  }, []);

  return (
    <Container maxWidth='lg'>
      <Grid container direction='row' sx={{ padding: 3 }} justifyContent='center'>
        {
          companies.map((company, index) => 
            <CompanyColumn
              key={index}
              selectedTimeSlots={listOfRanges}
              updateListOfTimeSlots={handleSelectTimeSlot}
              company={company}
            />)
        }
      </Grid>
    </Container>
  )
};
