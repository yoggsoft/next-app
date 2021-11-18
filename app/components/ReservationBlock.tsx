
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { CompanyTimeSlot } from '../types';
import { formatDateByHour } from '../utils';
import Block from './Block';

interface BlockProps {
  reservation?: CompanyTimeSlot | undefined
}

export default function ReservationBlock ({ reservation } : BlockProps) {
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