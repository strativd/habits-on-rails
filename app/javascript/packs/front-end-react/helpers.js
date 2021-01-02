import moment from 'moment'

export const getDatesThisWeek = () => {
  let week = []; 

  for (let i = 1; i <= 7; i++) {
    let day = moment().isoWeekday(i);
    week.push({
      weekday: day.format('dddd'),
      formatFull: day.format('YYYY-MM-DD'),
      formatTiny: day.format('MM-DD'),
    });
  }

  return week;
}
