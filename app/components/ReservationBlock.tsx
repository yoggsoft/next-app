
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { CompanyTimeSlot } from '../types';
import { formatDateByHour } from '../utils';
import Block from './Block';

interface IBlock {
  reservation?: CompanyTimeSlot | undefined
}

export default function ReservationBlock ({ reservation } : IBlock) {
  return (
    <Block>
			{reservation && (
				<Box sx={{
					display: 'flex',
					textAlign: 'center',
					alignItems: 'center',
					flexDirection: 'column'
				}}>
					<Typography fontWeight='bold'>Reservation:</Typography>
					<Typography>
						{`${formatDateByHour(reservation.start_time)} - ${formatDateByHour(reservation.end_time)}`}
					</Typography>
				</Box>
			)}
    </Block>
  );
}