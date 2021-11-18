import {
  Paper,
  Typography,
  Grid,
  Avatar,
  List,
  ListItem,
  ListSubheader
} from '@mui/material';
import { Company, CompanyTimeSlot, TimeSlot } from '../types';
import ReservationBlock from './ReservationBlock';
import { Box } from '@mui/system';
import { useEffect, useState, Fragment } from 'react';
import TimeSlotBlock from './TimseSlotBlock';
import Block from './Block';
import { weekdays } from '../utils';

interface CompanyColumnProps {
  company: Company,
  listOfReservations: Array<CompanyTimeSlot> | [],
  updateListOfReservations: any
}

export default function CompanyColumn ({
  listOfReservations,
  updateListOfReservations,
  company: { id, name, time_slots}
}: CompanyColumnProps) {
  const [reservation, setReservation] = useState<CompanyTimeSlot | undefined>();
  const [displayedReservations, setDisplayedReservations] = useState<[]>([]);

  useEffect(() => {
    const groupedByDay = time_slots.reduce((acc:any, timeslot: TimeSlot) => {
      const day:number = new Date(timeslot.start_time).getDay();
      return (day in acc)
        ? { ...acc, [day]: acc[day].concat(timeslot) }
        : { ...acc, [day]: [timeslot] }
    }, []);
    setDisplayedReservations(groupedByDay);
  }, []);

  const handleTimeSlotClick = (range: CompanyTimeSlot) => {
    const newReservation = reservation?.start_time !== range.start_time ? range : undefined;
    setReservation(newReservation);
    updateListOfReservations(range);
  };

  const isTimeSlotAvailable = (slot: CompanyTimeSlot) => {
    return listOfReservations.filter(
      item => (
        item.start_time === slot.start_time &&
        item.company_id !== slot.company_id
      )).length > 0
  };

  const isTimeSlotSelected = (slot: CompanyTimeSlot) => {
    return listOfReservations.filter(
      item => (
        item.start_time === slot.start_time &&
        item.company_id === slot.company_id
      )).length > 0
  };

  return (
    <Grid
      sx={{ height: 600, width: 200, padding: 1, margin: 1 }}
      justifyContent='space-between'
      flexDirection='column'
      component={Paper}
      container
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Block>
          <Avatar sx={{marginRight: 1 }}>{id}</Avatar>
          <Typography>{name}</Typography>
        </Block>
        <ReservationBlock reservation={reservation} />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <List sx={{
          maxHeight:450,
          overflowY: 'scroll',
          paddingTop: 0,
          paddingRight: 1,
          width: '100%'
        }}>
          {
            Object.entries(displayedReservations).map((item: any, index: number) => {
              return (
                <Fragment key={index}>
                  <ListSubheader>
                    <Typography
                      paragraph
                      color='primary'
                      align='center'
                      variant='h5'
                    >
                      {weekdays[item[0]]}
                    </Typography>
                  </ListSubheader>
                  {
                    item[1]
                      .sort((a: TimeSlot, b: TimeSlot) => +new Date(a.start_time) - +new Date(b.start_time))
                      .map((slot: TimeSlot, index: number) => {
                        const range: CompanyTimeSlot = { ...slot, company_id: id };
                        return (
                          <ListItem key={index} sx={{ padding: 0 }}>
                            <TimeSlotBlock
                              variant={isTimeSlotSelected(range) ? 'contained' : 'outlined'}
                              disabled={isTimeSlotAvailable(range)}
                              onClick={() => handleTimeSlotClick(range)}
                              slot={slot}
                            />
                          </ListItem>
                        );
                      })
                  }
                </Fragment>
              )
            })
          }
        </List>
      </Box>
    </Grid>
  );
}
