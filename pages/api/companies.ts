import type { NextApiRequest, NextApiResponse } from 'next'
import TimeSlots from '../../public/time_slots.json';
import { CompaniesData } from '../../app/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CompaniesData>
) {
  res.status(200).json({ data: TimeSlots })
}
