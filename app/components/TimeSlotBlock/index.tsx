
import { Button } from '@mui/material';
import { CompanyTimeSlot, TimeSlot } from '../../types';
import { formatDateByHour } from '../../utils';

interface TimeSlotBlockProps {
  reservation: CompanyTimeSlot | undefined
	slot: TimeSlot,
	[others: string]: any
}

export default function TimeSlotBlock ({ reservation, slot, ...others } : TimeSlotBlockProps) {
  return (
    <Button
			variant={reservation?.start_time === slot.start_time ?  'contained' : 'outlined'}
			color='primary'
			fullWidth
			sx={{ marginBottom: 1 }}
			{...others}
		>
			{
				`${formatDateByHour(slot.start_time)} - ${formatDateByHour(slot.end_time)}`
			}
		</Button>
  );
}

								