import moment from "moment";

export function formatDateByHour (hour: string) {
	return moment(hour).format('HH:mm');
}
