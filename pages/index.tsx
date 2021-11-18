import type { NextPage } from 'next'
import {
  Container,
  Grid
} from '@mui/material';
import TimeSlotManager from '../app/modules/TimeSlotManager';

const Home: NextPage = (props) => {
  return (
    <Container maxWidth={false}>
      <Grid container justifyContent='center'>
        <TimeSlotManager />
      </Grid>
    </Container>
  );
}

export default Home
