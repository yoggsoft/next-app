import type { NextApiRequest, NextApiResponse } from 'next'
import TimeSlots from '../../../public/time_slots.json';
import { CompaniesData } from '../../../app/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CompaniesData>
) {
		const reqId = req.query.companyId as string;
		const numberId = parseInt(reqId);
		const results = TimeSlots.filter(company => company.id === numberId);
  	res.status(200).json({ data: results })
}
