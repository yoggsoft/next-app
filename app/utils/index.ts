import moment from "moment";

export function formatDateByHour (hour: string) {
	return moment(hour).format('HH:mm');
}

export function formatDateByDate (hour: string) {
	return moment(hour).format('DD-MM-YY HH:mm');
}

export function formatDateByDay (hour: string) {
	return moment(hour).format('LLLL');
}
