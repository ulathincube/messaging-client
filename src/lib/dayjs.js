import dayjs from 'dayjs';

function formatTime(time) {
  return dayjs(time).format('h:MM A');
}

function formatDay(time) {
  return dayjs(time).format('dddd');
}

export { formatTime, formatDay };
