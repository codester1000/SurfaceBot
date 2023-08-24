const moment = require("moment");

const timeSince = ( date ) => {
  const yourDate = date;
  const currentDate = moment();

  const yearsDifference = currentDate.diff(yourDate, 'years');
  const monthsDifference = currentDate.diff(yourDate, 'months') % 12;
  const daysDifference = Math.floor(currentDate.diff(yourDate, 'days') % 30.44);

  return `${yearsDifference}y ${monthsDifference}m ${daysDifference}d`;
}

export default timeSince;