import { useState, useEffect, useReducer } from "react";
import axios from 'axios';
import { Container, Grid } from "@mui/material";
import { Company, CompanyTimeSlot } from "../types";
import CompanyColumn from "../components/CompanyColumn";

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
  const [listOfReservations, setListOfReservations] = useState<CompanyTimeSlot[]>([]);

  useEffect(() => {
    const doFetch = () => fetchCompaniesData().then(res => {
      if (res === undefined) return;
      const result = res;
      setCompanies(result);
    });
    doFetch();
  }, []);

  const handleSelectReservation = (newSelectedSlot: CompanyTimeSlot) => {
    if (isTimeSlotOnList(newSelectedSlot)) {
      removeReservation(newSelectedSlot);
    } else if (companyAlreadyHasReservation(newSelectedSlot)) {
      const newList = listOfReservations.filter(item => item.company_id === newSelectedSlot.company_id);
      setListOfReservations([...newList, newSelectedSlot]);
    } else {
      addReservation(newSelectedSlot);
    }
  };

  const addReservation = (newSelectedSlot: CompanyTimeSlot) => {
    setListOfReservations([...listOfReservations, newSelectedSlot]);
  };

  const removeReservation = (newSelectedSlot: CompanyTimeSlot) => {
    setListOfReservations(listOfReservations.filter(i => i.company_id !== newSelectedSlot.company_id));
  };

  const companyAlreadyHasReservation = (slot: CompanyTimeSlot) => {
    return listOfReservations.filter(item => (item.company_id === slot.company_id)).length > 0;
  }

  const isTimeSlotOnList = (slot: CompanyTimeSlot) => {
    return listOfReservations.filter(
      item => (
        item.end_time === slot.end_time &&
        item.start_time === slot.start_time &&
        item.company_id === slot.company_id
      )).length > 0
  };

  return (
    <Container maxWidth='lg'>
      <Grid container direction='row' sx={{ padding: 3 }} justifyContent='center'>
        {
          companies.map((company, index) => 
            <CompanyColumn
              key={index}
              listOfReservations={listOfReservations}
              updateListOfReservations={handleSelectReservation}
              company={company}
            />)
        }
      </Grid>
    </Container>
  )
};
