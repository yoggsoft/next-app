import { Paper, Typography, Grid, Avatar, List } from '@mui/material';
import { Company, CompanyTimeSlot, TimeSlot } from '../../types';
import Block from '../Block';
import ReservationBlock from '../ReservationBlock';
import { Box } from '@mui/system';
import { useState } from 'react';
import TimeSlotBlock from '../TimeSlotBlock';

interface CompanyColumnProps {
  company: Company,
  selectedTimeSlots: Array<CompanyTimeSlot> | [],
  updateListOfTimeSlots: any
}

export default function CompanyColumn ({
  selectedTimeSlots,
  updateListOfTimeSlots,
  company: { id, name, time_slots}
}: CompanyColumnProps) {
  const [reservation, setReservation] = useState<CompanyTimeSlot>();
  const handleTimeSlotClick = (range: CompanyTimeSlot) => {
    updateListOfTimeSlots(range);
    setReservation(range);
  };

  const isTimeSlotAvailable = (slot: CompanyTimeSlot) => {
    return selectedTimeSlots.filter(
      item => (
        item.start_time === slot.start_time &&
        item.company_id !== slot.company_id
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
        <List sx={{ maxHeight:450, overflowY: 'scroll', marginTop: 'auto'}}>
          {
            time_slots.map((slot, index) => {
              const range: CompanyTimeSlot = { ...slot, company_id: id };
              return (
                <TimeSlotBlock
                  key={index}
                  disabled={isTimeSlotAvailable(range)}
                  onClick={() => handleTimeSlotClick(range)}
                  slot={slot}
                  reservation={reservation}
                />
              );
            })
          }
        </List>
      </Box>
    </Grid>
  );
}