const timeFix = (delta) => {
  let hours = Math.floor(delta / 3600);
  delta -= hours * 3600;
  if (hours === 0) {
    hours = "00";
  } else if (hours.length === 1) {
    hours = `0${hours}`;
  }
  let mins = Math.floor(delta / 60);
  delta -= mins * 60;
  if (mins === 0) {
    mins = "00";
  } else if (mins.length === 1) {
    mins = `0${mins}`;
  }
  let secs = delta;
  if (secs == 0) {
    secs = "00";
  } else if (secs < 10) {
    secs = `0${secs}`;
  }

  return `${hours}:${mins}:${secs}`;
};

export default timeFix;
