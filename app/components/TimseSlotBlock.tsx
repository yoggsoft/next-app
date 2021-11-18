
import { Button } from '@mui/material';
import { CompanyTimeSlot, TimeSlot } from '../types';
import { formatDateByHour } from '../utils';

interface TimeSlotBlockProps {
	slot: TimeSlot,
	[others: string]: any
}

export default function TimeSlotBlock ({ slot, ...others } : TimeSlotBlockProps) {
  return (
    <Button
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

								